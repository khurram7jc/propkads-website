import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(req) {
  try {
    const { email } = await req.json();
    const trimmed = (email || '').trim().toLowerCase();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmed || !emailPattern.test(trimmed)) {
      return NextResponse.json({ success: false, error: 'Please enter a valid email address.' }, { status: 400 });
    }

    await sql`
      insert into newsletter_subscribers (email)
      values (${trimmed})
      on conflict (email) do nothing
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('newsletter route error:', err);
    return NextResponse.json({ success: false, error: 'Server error.' }, { status: 500 });
  }
}
