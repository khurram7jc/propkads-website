import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(req) {
  const session = getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const search = searchParams.get('search');

  let rows;
  if (status && search) {
    const like = `%${search}%`;
    rows = await sql`
      select * from leads
      where status = ${status}
        and (full_name ilike ${like} or phone ilike ${like} or city ilike ${like} or company_name ilike ${like})
      order by created_at desc`;
  } else if (status) {
    rows = await sql`select * from leads where status = ${status} order by created_at desc`;
  } else if (search) {
    const like = `%${search}%`;
    rows = await sql`
      select * from leads
      where full_name ilike ${like} or phone ilike ${like} or city ilike ${like} or company_name ilike ${like}
      order by created_at desc`;
  } else {
    rows = await sql`select * from leads order by created_at desc`;
  }

  return NextResponse.json({ success: true, leads: rows });
}

export async function PATCH(req) {
  const session = getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const body = await req.json();
  const {
    id,
    full_name = null,
    company_name = null,
    phone = null,
    city = null,
    inventory_type = null,
    status = null,
  } = body;

  if (!id) return NextResponse.json({ success: false, error: 'Missing id.' }, { status: 400 });

  await sql`
    update leads set
      full_name = coalesce(${full_name}, full_name),
      company_name = coalesce(${company_name}, company_name),
      phone = coalesce(${phone}, phone),
      city = coalesce(${city}, city),
      inventory_type = coalesce(${inventory_type}, inventory_type),
      status = coalesce(${status}, status),
      updated_at = now()
    where id = ${id}
  `;
  return NextResponse.json({ success: true });
}

export async function DELETE(req) {
  const session = getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ success: false, error: 'Missing id.' }, { status: 400 });

  await sql`delete from leads where id = ${id}`;
  return NextResponse.json({ success: true });
}
