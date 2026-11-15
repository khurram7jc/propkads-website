import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

async function ensureLeadColumns() {
  await sql`alter table leads add column if not exists lead_category text default 'client'`;
  await sql`alter table leads add column if not exists project_name text`;
  await sql`alter table leads add column if not exists unit_interest text`;
  await sql`alter table leads add column if not exists next_followup_date text`;

  // Auto-classify any earlier Karachi Enclave inquiries that were stored via company_name
  await sql`
    update leads
    set
      lead_category = 'project',
      project_name = coalesce(project_name, 'Karachi Enclave'),
      unit_interest = coalesce(unit_interest, replace(company_name, 'Karachi Enclave Inquiry - ', ''))
    where company_name ilike 'Karachi Enclave Inquiry%'
      and (lead_category is null or lead_category = 'client')
  `;
}

export async function GET(req) {
  const session = getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  try {
    await ensureLeadColumns();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category'); // 'client' | 'project' | null
    const project = searchParams.get('project');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const allRows = await sql`select * from leads order by created_at desc`;

    const filtered = allRows.filter((r) => {
      const rowCat = r.lead_category || 'client';
      if (category && rowCat !== category) return false;
      if (project && (r.project_name || '') !== project) return false;
      if (status && r.status !== status) return false;
      if (search) {
        const q = search.toLowerCase();
        const hay = [
          r.full_name,
          r.company_name,
          r.phone,
          r.city,
          r.inventory_type,
          r.project_name,
          r.unit_interest,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const totalCategoryCount = allRows.filter((r) => (r.lead_category || 'client') === (category || 'client')).length;

    return NextResponse.json({ success: true, leads: filtered, totalCount: totalCategoryCount });
  } catch (err) {
    console.error('admin leads GET error:', err);
    return NextResponse.json({ success: true, leads: [] });
  }
}

export async function PATCH(req) {
  const session = getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  try {
    await ensureLeadColumns();

    const body = await req.json();
    const {
      id,
      full_name = null,
      company_name = null,
      phone = null,
      city = null,
      inventory_type = null,
      status = null,
      project_name = null,
      unit_interest = null,
      next_followup_date,
    } = body;

    if (!id) return NextResponse.json({ success: false, error: 'Missing id.' }, { status: 400 });

    const hasFollowup = Object.prototype.hasOwnProperty.call(body, 'next_followup_date');
    const followupVal = hasFollowup ? (next_followup_date || null) : null;

    if (hasFollowup) {
      await sql`
        update leads set
          full_name = coalesce(${full_name}, full_name),
          company_name = coalesce(${company_name}, company_name),
          phone = coalesce(${phone}, phone),
          city = coalesce(${city}, city),
          inventory_type = coalesce(${inventory_type}, inventory_type),
          status = coalesce(${status}, status),
          project_name = coalesce(${project_name}, project_name),
          unit_interest = coalesce(${unit_interest}, unit_interest),
          next_followup_date = ${followupVal},
          updated_at = now()
        where id = ${id}
      `;
    } else {
      await sql`
        update leads set
          full_name = coalesce(${full_name}, full_name),
          company_name = coalesce(${company_name}, company_name),
          phone = coalesce(${phone}, phone),
          city = coalesce(${city}, city),
          inventory_type = coalesce(${inventory_type}, inventory_type),
          status = coalesce(${status}, status),
          project_name = coalesce(${project_name}, project_name),
          unit_interest = coalesce(${unit_interest}, unit_interest),
          updated_at = now()
        where id = ${id}
      `;
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('admin leads PATCH error:', err);
    return NextResponse.json({ success: false, error: 'Server error.' }, { status: 500 });
  }
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
