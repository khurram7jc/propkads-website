import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(req) {
  const session = getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const position = searchParams.get('position');

    // Ensure table exists
    await sql`
      create table if not exists job_applications (
        id serial primary key,
        full_name text not null,
        email text not null,
        phone text not null,
        position text,
        portfolio_link text,
        message text,
        resume_name text,
        resume_size integer,
        resume_type text,
        resume_data text,
        created_at timestamptz not null default now()
      )
    `;

    let rows;
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

    return NextResponse.json({ success: true, applications: rows });
  } catch (err) {
    console.error('admin applications GET error:', err);
    return NextResponse.json({ success: true, applications: [] });
  }
}

export async function DELETE(req) {
  const session = getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'Missing id.' }, { status: 400 });

    await sql`delete from job_applications where id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('admin applications DELETE error:', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
