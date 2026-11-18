import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { liveLocalDevSubscribers, deleteLocalDevSubscriber } from '@/lib/mockNewsletter';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  try {
    let rows = null;
    try {
      rows = await sql`select * from newsletter_subscribers order by created_at desc`;
    } catch (sqlErr) {
      console.warn('admin newsletter SQL query warning:', sqlErr.message);
    }

    if ((!rows || rows.length === 0) && process.env.NODE_ENV !== 'production') {
      rows = liveLocalDevSubscribers;
    }

    return NextResponse.json({ success: true, subscribers: rows || [] });
  } catch (err) {
    console.error('admin newsletter GET error:', err);
    return NextResponse.json({ success: true, subscribers: process.env.NODE_ENV !== 'production' ? liveLocalDevSubscribers : [] });
  }
}

export async function DELETE(req) {
  const session = getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'Missing subscriber id.' }, { status: 400 });

    try {
      await sql`delete from newsletter_subscribers where id = ${id}`;
    } catch (dbErr) {
      console.warn('admin newsletter SQL delete warning:', dbErr.message);
    }

    if (process.env.NODE_ENV !== 'production') {
      deleteLocalDevSubscriber(id);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('admin newsletter DELETE error:', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
