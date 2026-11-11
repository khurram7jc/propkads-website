import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { hashPassword } from '@/lib/password';
import { sendVerificationEmail } from '@/lib/email';

export async function GET(req) {
  const session = getSession();
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Admin access required.' }, { status: 403 });
  }

  const rows = await sql`select id, name, email, role, permissions, status, verification_token, created_at from users order by created_at asc`;
  const origin = req.nextUrl.origin || 'https://propkads.com';

  const parsedUsers = rows.map((u) => {
    let perms = [];
    if (u.role === 'admin') {
      perms = ['all'];
    } else if (u.permissions) {
      try {
        perms = JSON.parse(u.permissions);
      } catch {
        perms = String(u.permissions).split(',').map((p) => p.trim());
      }
    }
    const status = u.status || 'active';
    const verifyLink = u.verification_token ? `${origin}/admin/verify?token=${encodeURIComponent(u.verification_token)}` : null;

    return {
      ...u,
      permissions: perms,
      status,
      verifyLink,
    };
  });

  return NextResponse.json({ success: true, users: parsedUsers });
}

export async function POST(req) {
  const session = getSession();
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Admin access required.' }, { status: 403 });
  }

  const { name, email, password, permissions } = await req.json();
  if (!name || !email) {
    return NextResponse.json({ success: false, error: 'Name and email are required.' }, { status: 400 });
  }

  const normalizedEmail = email.toLowerCase().trim();
  const existing = await sql`select id from users where email = ${normalizedEmail}`;
  if (existing.length > 0) {
    return NextResponse.json({ success: false, error: 'A user with this email already exists.' }, { status: 409 });
  }

  const permsArray = Array.isArray(permissions) ? permissions : ['all'];
  const permsJson = JSON.stringify(permsArray);
  const tempPassword = password || crypto.randomBytes(8).toString('hex');
  const password_hash = hashPassword(tempPassword);

  const token = crypto.randomBytes(32).toString('hex');
  // 7 days expiration
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const formattedExpires = expiresAt.toISOString().slice(0, 19).replace('T', ' ');

  // Insert user with status = 'pending'
  await sql`
    insert into users (name, email, password_hash, role, permissions, status, verification_token, verification_expires)
    values (${name}, ${normalizedEmail}, ${password_hash}, 'team', ${permsJson}, 'pending', ${token}, ${formattedExpires})
  `;

  const emailResult = await sendVerificationEmail({
    to: normalizedEmail,
    name,
    token,
    origin: req.nextUrl.origin,
  });

  return NextResponse.json({
    success: true,
    verifyLink: emailResult.verifyLink,
    emailSent: emailResult.sent,
    message: emailResult.sent
      ? `Verification invite email sent to ${normalizedEmail}.`
      : `Member created! Verification link generated for ${normalizedEmail}.`,
  });
}

export async function PATCH(req) {
  const session = getSession();
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Admin access required.' }, { status: 403 });
  }

  const body = await req.json();
  const { id, action, permissions } = body;
  if (!id) return NextResponse.json({ success: false, error: 'Missing id.' }, { status: 400 });

  if (action === 'resend_invite') {
    const userRows = await sql`select id, name, email from users where id = ${id}`;
    if (!userRows || userRows.length === 0) {
      return NextResponse.json({ success: false, error: 'User not found.' }, { status: 404 });
    }
    const user = userRows[0];
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const formattedExpires = expiresAt.toISOString().slice(0, 19).replace('T', ' ');

    await sql`
      update users 
      set status = 'pending', 
          verification_token = ${token}, 
          verification_expires = ${formattedExpires} 
      where id = ${id}
    `;

    const emailResult = await sendVerificationEmail({
      to: user.email,
      name: user.name,
      token,
      origin: req.nextUrl.origin,
    });

    return NextResponse.json({
      success: true,
      verifyLink: emailResult.verifyLink,
      emailSent: emailResult.sent,
      message: emailResult.sent ? 'Invitation email resent.' : 'New invitation link generated.',
    });
  }

  // Update permissions
  const permsArray = Array.isArray(permissions) && permissions.length > 0 ? permissions : [];
  const permsJson = JSON.stringify(permsArray);

  await sql`update users set permissions = ${permsJson} where id = ${id}`;
  return NextResponse.json({ success: true });
}

export async function DELETE(req) {
  const session = getSession();
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Admin access required.' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ success: false, error: 'Missing id.' }, { status: 400 });

  const targetUsers = await sql`select id, email, role, name from users where id = ${id}`;
  if (!targetUsers || targetUsers.length === 0) {
    return NextResponse.json({ success: false, error: 'Team member not found or already removed.' }, { status: 404 });
  }
  const targetUser = targetUsers[0];

  // Prevent removing own active account (only if email matches current logged-in admin)
  const isSelf = Boolean(
    session.email &&
    targetUser.email &&
    session.email.toLowerCase().trim() === targetUser.email.toLowerCase().trim()
  );
  if (isSelf) {
    return NextResponse.json({ success: false, error: 'You cannot remove your own active account.' }, { status: 400 });
  }

  // Prevent deleting primary admin accounts
  const protectedEmails = [
    'propkads@gmail.com',
    'admin@propkads.com',
    'khurram@propkads.com',
  ];
  if (targetUser.role === 'admin' && protectedEmails.includes(targetUser.email.toLowerCase())) {
    return NextResponse.json({ success: false, error: 'Cannot remove primary admin account.' }, { status: 400 });
  }

  await sql`delete from users where id = ${id}`;

  const remaining = await sql`select id from users where id = ${id}`;
  if (remaining && remaining.length > 0) {
    return NextResponse.json({ success: false, error: 'Failed to delete user from database.' }, { status: 500 });
  }

  return NextResponse.json({ success: true, message: 'Team member removed successfully.' });
}
