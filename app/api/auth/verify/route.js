import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { hashPassword } from '@/lib/password';
import { createSessionToken, COOKIE_NAME } from '@/lib/auth';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ success: false, error: 'Verification token is required.' }, { status: 400 });
    }

    const rows = await sql`
      select id, name, email, status, verification_expires 
      from users 
      where verification_token = ${token}
    `;

    if (!rows || rows.length === 0) {
      return NextResponse.json({ success: false, error: 'Invalid or already used verification link.' }, { status: 400 });
    }

    const user = rows[0];
    if (user.verification_expires && new Date(user.verification_expires) < new Date()) {
      return NextResponse.json({ success: false, error: 'This verification link has expired. Please request a new invite from the admin.' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, status: user.status },
    });
  } catch (err) {
    console.error('Verify GET error:', err);
    return NextResponse.json({ success: false, error: 'Server error checking token.' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ success: false, error: 'Token and new password are required.' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ success: false, error: 'Password must be at least 6 characters long.' }, { status: 400 });
    }

    const rows = await sql`
      select * from users where verification_token = ${token}
    `;

    if (!rows || rows.length === 0) {
      return NextResponse.json({ success: false, error: 'Invalid or already used verification token.' }, { status: 400 });
    }

    const user = rows[0];
    if (user.verification_expires && new Date(user.verification_expires) < new Date()) {
      return NextResponse.json({ success: false, error: 'This verification link has expired. Please request a new one.' }, { status: 400 });
    }

    const password_hash = hashPassword(password);

    await sql`
      update users 
      set status = 'active', 
          password_hash = ${password_hash}, 
          verification_token = NULL, 
          verification_expires = NULL 
      where id = ${user.id}
    `;

    // Automatically log user in
    const activeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
    };

    const sessionToken = createSessionToken(activeUser);
    const res = NextResponse.json({ success: true, message: 'Account activated successfully.' });
    res.cookies.set(COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (err) {
    console.error('Verify POST error:', err);
    return NextResponse.json({ success: false, error: 'Server error activating account.' }, { status: 500 });
  }
}
