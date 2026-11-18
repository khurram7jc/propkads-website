import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { liveLocalDevApplications, deleteLocalDevApplication } from '@/lib/mockApplications';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  const session = getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const position = searchParams.get('position');

    let rows = null;
    try {
      if (position && search) {
        const like = `%${search}%`;
        rows = await sql`
          select id, full_name, email, phone, position, portfolio_link, message, resume_name, resume_size,
                 (resume_data is not null and length(resume_data) > 0) as has_resume, created_at
          from job_applications
          where position = ${position}
            and (full_name ilike ${like} or email ilike ${like} or phone ilike ${like})
          order by created_at desc
        `;
      } else if (position) {
        rows = await sql`
          select id, full_name, email, phone, position, portfolio_link, message, resume_name, resume_size,
                 (resume_data is not null and length(resume_data) > 0) as has_resume, created_at
          from job_applications
          where position = ${position}
          order by created_at desc
        `;
      } else if (search) {
        const like = `%${search}%`;
        rows = await sql`
          select id, full_name, email, phone, position, portfolio_link, message, resume_name, resume_size,
                 (resume_data is not null and length(resume_data) > 0) as has_resume, created_at
          from job_applications
          where full_name ilike ${like} or email ilike ${like} or phone ilike ${like} or position ilike ${like}
          order by created_at desc
        `;
      } else {
        rows = await sql`
          select id, full_name, email, phone, position, portfolio_link, message, resume_name, resume_size,
                 (resume_data is not null and length(resume_data) > 0) as has_resume, created_at
          from job_applications
          order by created_at desc
        `;
      }
    } catch (sqlErr) {
      console.warn('admin applications SQL query warning:', sqlErr.message);
    }

    if ((!rows || rows.length === 0) && process.env.NODE_ENV !== 'production') {
      let filtered = [...liveLocalDevApplications];
      if (position) {
        filtered = filtered.filter((a) => (a.position || '').toLowerCase() === position.toLowerCase());
      }
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter((a) =>
          [a.full_name, a.email, a.phone, a.position].filter(Boolean).some((field) => field.toLowerCase().includes(q))
        );
      }
      rows = filtered;
    }

    return NextResponse.json({ success: true, applications: rows || [] });
  } catch (err) {
    console.error('admin applications GET error:', err);
    return NextResponse.json({ success: true, applications: process.env.NODE_ENV !== 'production' ? liveLocalDevApplications : [] });
  }
}

export async function DELETE(req) {
  const session = getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'Missing id.' }, { status: 400 });

    try {
      await sql`delete from job_applications where id = ${id}`;
    } catch (dbErr) {
      console.warn('admin applications SQL delete warning:', dbErr.message);
    }

    if (process.env.NODE_ENV !== 'production') {
      deleteLocalDevApplication(id);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('admin applications DELETE error:', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
