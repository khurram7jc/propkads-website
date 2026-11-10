import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { hashPassword } from '@/lib/password';

export async function GET() {
  const session = getSession();
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Admin access required.' }, { status: 403 });
  }
  const rows = await sql`select id, name, email, role, created_at from users order by created_at asc`;
  return NextResponse.json({ success: true, users: rows });
}

export async function POST(req) {
  const session = getSession();
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Admin access required.' }, { status: 403 });
  }

  const { name, email, password, role } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({ success: false, error: 'Name, email, and password are required.' }, { status: 400 });
  }

  const existing = await sql`select id from users where email = ${email.toLowerCase().trim()}`;
  if (existing.length > 0) {
    return NextResponse.json({ success: false, error: 'A user with this email already exists.' }, { status: 409 });
  }

  const password_hash = hashPassword(password);
  await sql`
    insert into users (name, email, password_hash, role)
    values (${name}, ${email.toLowerCase().trim()}, ${password_hash}, ${role === 'admin' ? 'admin' : 'team'})
  `;
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
    'khurram7jc@gmail.com',
  ];
  if (protectedEmails.includes(targetUser.email.toLowerCase())) {
    return NextResponse.json({ success: false, error: 'Cannot remove primary admin account.' }, { status: 400 });
  }

  await sql`delete from users where id = ${id}`;

  const remaining = await sql`select id from users where id = ${id}`;
  if (remaining && remaining.length > 0) {
    return NextResponse.json({ success: false, error: 'Failed to delete user from database.' }, { status: 500 });
  }

  return NextResponse.json({ success: true, message: 'Team member removed successfully.' });
}
