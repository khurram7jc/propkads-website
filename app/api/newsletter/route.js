import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { addLocalDevSubscriber } from '@/lib/mockNewsletter';

export async function POST(req) {
  try {
    const { email } = await req.json();
    const trimmed = (email || '').trim().toLowerCase();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmed || !emailPattern.test(trimmed)) {
      return NextResponse.json({ success: false, error: 'Please enter a valid email address.' }, { status: 400 });
    }

    try {
      await sql`
        insert into newsletter_subscribers (email)
        values (${trimmed})
        on conflict (email) do nothing
      `;
    } catch (dbErr) {
      console.warn('newsletter DB insert warning:', dbErr.message);
    }

    if (process.env.NODE_ENV !== 'production') {
      addLocalDevSubscriber(trimmed);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('newsletter route error:', err);
    return NextResponse.json({ success: false, error: 'Server error.' }, { status: 500 });
  }
}
