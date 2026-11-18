import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { hashPassword } from '@/lib/password';
import {
  liveLocalDevUsers,
  addLocalDevUser,
  updateLocalDevUser,
  deleteLocalDevUser,
} from '@/lib/mockUsers';

export const dynamic = 'force-dynamic';

async function ensureUserColumns() {
  try {
    await sql`alter table users add column if not exists initial_password text`;
  } catch (err) {
    // Column may already exist or table managed
  }
  try {
    await sql`alter table users add column if not exists designation varchar(120)`;
  } catch (err) {
    // Column may already exist or table managed
  }
}

export async function GET(req) {
  const session = getSession();
  const isAdmin = session?.role === 'admin' || (!session && process.env.NODE_ENV === 'development');
  if (!isAdmin) {
    return NextResponse.json({ success: false, error: 'Admin access required.' }, { status: 403 });
  }

  try {
    await ensureUserColumns();
    let rows = await sql`select id, name, email, role, designation, permissions, status, initial_password, verification_token, created_at from users order by created_at asc`;
    if ((!rows || rows.length === 0) && process.env.NODE_ENV !== 'production') {
      return NextResponse.json({ success: true, users: liveLocalDevUsers });
    }

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

      return {
        ...u,
        designation: u.designation || (u.role === 'admin' ? 'Primary Admin' : 'Team Member'),
        permissions: perms,
        status,
        initial_password: u.initial_password || null,
      };
    });

    return NextResponse.json({ success: true, users: parsedUsers });
  } catch (err) {
    console.warn('MySQL fallback to local dev mock users:', err.message);
    return NextResponse.json({ success: true, users: liveLocalDevUsers });
  }
}

export async function POST(req) {
  const session = getSession();
  const isAdmin = session?.role === 'admin' || (!session && process.env.NODE_ENV === 'development');
  if (!isAdmin) {
    return NextResponse.json({ success: false, error: 'Admin access required.' }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const { name, email, password, permissions, designation } = body;
  if (!name || !email) {
    return NextResponse.json({ success: false, error: 'Name and email are required.' }, { status: 400 });
  }
  if (!password || password.length < 6) {
    return NextResponse.json({ success: false, error: 'Password is required and must be at least 6 characters.' }, { status: 400 });
  }

  const normalizedEmail = email.toLowerCase().trim();
  const permsArray = Array.isArray(permissions) ? permissions : ['all'];
  const permsJson = JSON.stringify(permsArray);
  const password_hash = hashPassword(password);
  const userDesignation = designation?.trim() || 'Team Member';

  try {
    await ensureUserColumns();
    const existing = await sql`select id from users where email = ${normalizedEmail}`;
    if (existing && existing.length > 0) {
      return NextResponse.json({ success: false, error: 'A user with this email already exists.' }, { status: 409 });
    }

    // Insert user as directly active with saved initial_password for primary admin visibility
    const insertRes = await sql`
      insert into users (name, email, password_hash, role, designation, permissions, status, initial_password)
      values (${name}, ${normalizedEmail}, ${password_hash}, 'team', ${userDesignation}, ${permsJson}, 'active', ${password})
    `;
    const newUserId = insertRes?.insertId || (await sql`select id from users where email = ${normalizedEmail}`)?.[0]?.id;

    let devUser = null;
    if (process.env.NODE_ENV !== 'production') {
      devUser = addLocalDevUser({
        name,
        email: normalizedEmail,
        password,
        designation: userDesignation,
        permissions: permsArray,
      });
    }

    const finalId = newUserId || devUser?.id || 1;

    return NextResponse.json({
      success: true,
      user: {
        id: finalId,
        name,
        email: normalizedEmail,
        designation: userDesignation,
        password,
        initial_password: password,
      },
      message: `Team member account created for ${normalizedEmail}.`,
    });
  } catch (err) {
    console.warn('MySQL fallback for POST /api/admin/users:', err.message);
    const existing = liveLocalDevUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
    if (existing) {
      return NextResponse.json({ success: false, error: 'A user with this email already exists.' }, { status: 409 });
    }
    const created = addLocalDevUser({
      name,
      email: normalizedEmail,
      password,
      designation: userDesignation,
      permissions: permsArray,
    });
    return NextResponse.json({
      success: true,
      user: {
        id: created.id,
        name: created.name,
        email: created.email,
        designation: created.designation,
        password: created.initial_password,
        initial_password: created.initial_password,
      },
      message: `Team member account created for ${created.email}.`,
    });
  }
}

export async function PATCH(req) {
  const session = getSession();
  const isAdmin = session?.role === 'admin' || (!session && process.env.NODE_ENV === 'development');
  if (!isAdmin) {
    return NextResponse.json({ success: false, error: 'Admin access required.' }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const { id, permissions, password, designation } = body;
  if (!id) return NextResponse.json({ success: false, error: 'Missing id.' }, { status: 400 });

  try {
    await ensureUserColumns();

    if (password) {
      if (password.length < 6) {
        return NextResponse.json({ success: false, error: 'Password must be at least 6 characters.' }, { status: 400 });
      }
      const password_hash = hashPassword(password);
      await sql`update users set password_hash = ${password_hash}, initial_password = ${password} where id = ${id}`;
    }

    if (Array.isArray(permissions)) {
      const permsJson = JSON.stringify(permissions);
      await sql`update users set permissions = ${permsJson} where id = ${id}`;
    }

    if (designation !== undefined) {
      const cleanDesignation = designation?.trim() || 'Team Member';
      await sql`update users set designation = ${cleanDesignation} where id = ${id}`;
    }

    if (process.env.NODE_ENV !== 'production') {
      updateLocalDevUser(id, {
        ...(Array.isArray(permissions) ? { permissions } : {}),
        ...(password ? { password } : {}),
        ...(designation !== undefined ? { designation: designation?.trim() || 'Team Member' } : {}),
      });
    }

    return NextResponse.json({ success: true, message: 'Team member updated successfully.' });
  } catch (err) {
    console.warn('MySQL fallback for PATCH /api/admin/users:', err.message);
    updateLocalDevUser(id, {
      ...(Array.isArray(permissions) ? { permissions } : {}),
      ...(password ? { password } : {}),
      ...(designation !== undefined ? { designation: designation?.trim() || 'Team Member' } : {}),
    });
    return NextResponse.json({ success: true });
  }
}

export async function DELETE(req) {
  const session = getSession();
  const isAdmin = session?.role === 'admin' || (!session && process.env.NODE_ENV === 'development');
  if (!isAdmin) {
    return NextResponse.json({ success: false, error: 'Admin access required.' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ success: false, error: 'Missing id.' }, { status: 400 });

  const protectedEmails = [
    'propkads@gmail.com',
    'admin@propkads.com',
    'khurram@propkads.com',
  ];

  try {
    let targetUsers = await sql`select id, email, role, name from users where id = ${id}`;
    if ((!targetUsers || targetUsers.length === 0) && process.env.NODE_ENV !== 'production') {
      const devFound = liveLocalDevUsers.find((u) => u.id === Number(id));
      if (devFound) {
        if (devFound.role === 'admin' && protectedEmails.includes(devFound.email.toLowerCase())) {
          return NextResponse.json({ success: false, error: 'Cannot remove primary admin account.' }, { status: 400 });
        }
        deleteLocalDevUser(id);
        return NextResponse.json({ success: true, message: 'Team member removed successfully.' });
      }
    }
    if (!targetUsers || targetUsers.length === 0) {
      return NextResponse.json({ success: false, error: 'Team member not found or already removed.' }, { status: 404 });
    }
    const targetUser = targetUsers[0];

    const isSelf = Boolean(
      session?.email &&
      targetUser.email &&
      session.email.toLowerCase().trim() === targetUser.email.toLowerCase().trim()
    );
    if (isSelf) {
      return NextResponse.json({ success: false, error: 'You cannot remove your own active account.' }, { status: 400 });
    }

    if (targetUser.role === 'admin' && protectedEmails.includes(targetUser.email.toLowerCase())) {
      return NextResponse.json({ success: false, error: 'Cannot remove primary admin account.' }, { status: 400 });
    }

    await sql`delete from users where id = ${id}`;
    return NextResponse.json({ success: true, message: 'Team member removed successfully.' });
  } catch (err) {
    console.warn('MySQL fallback for DELETE /api/admin/users:', err.message);
    const targetUser = liveLocalDevUsers.find((u) => u.id === Number(id));
    if (!targetUser) {
      return NextResponse.json({ success: false, error: 'Team member not found or already removed.' }, { status: 404 });
    }
    if (targetUser.role === 'admin' && protectedEmails.includes(targetUser.email.toLowerCase())) {
      return NextResponse.json({ success: false, error: 'Cannot remove primary admin account.' }, { status: 400 });
    }
    deleteLocalDevUser(id);
    return NextResponse.json({ success: true, message: 'Team member removed successfully.' });
  }
}
