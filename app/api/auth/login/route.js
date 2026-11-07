import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { verifyPassword } from '@/lib/password';
import { createSessionToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const trimmedPassword = password.trim();

    // 1. Direct Admin Access (Authorized Credentials)
    const allowedAdminEmails = [
      'propkads@gmail.com',
      'admin@propkads.com',
      'khurram@propkads.com',
      'khurram7jc@gmail.com',
      'admin',
    ];
    const allowedAdminPasswords = ['daryalaw@', 'daryalaw', 'admin123', 'propkads123', 'admin', 'propkads'];

    const isMatchEmail = allowedAdminEmails.includes(normalizedEmail) || normalizedEmail.includes('propkads');
    const isMatchPassword = allowedAdminPasswords.includes(trimmedPassword);

    if (isMatchEmail && isMatchPassword) {
      const adminUser = {
        id: 1,
        name: 'Khurram Mushtaq',
        email: 'propkads@gmail.com',
        role: 'admin',
      };
      const token = createSessionToken(adminUser);
      const res = NextResponse.json({ success: true, user: { name: adminUser.name, role: adminUser.role } });
      res.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
      return res;
    }

    // 2. Database Verification (MySQL users table if configured)
    if (process.env.DB_NAME || process.env.DATABASE_URL) {
      try {
        const rows = await sql`select * from users where email = ${normalizedEmail}`;
        const user = rows[0];

        if (user && verifyPassword(trimmedPassword, user.password_hash)) {
          const token = createSessionToken(user);
          const res = NextResponse.json({ success: true, user: { name: user.name, role: user.role } });
          res.cookies.set(COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
          });
          return res;
        }
      } catch (dbErr) {
        console.error('Database user lookup error:', dbErr);
      }
    }

    return NextResponse.json({ success: false, error: 'Invalid email or password.' }, { status: 401 });
  } catch (err) {
    console.error('Login route error:', err);
    return NextResponse.json({ success: false, error: 'Server error. Please try again.' }, { status: 500 });
  }
}
