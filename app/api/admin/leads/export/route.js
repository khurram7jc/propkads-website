import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { liveLocalDevLeads } from '@/lib/mockClientLeads';
import { liveLocalDevProjectLeads } from '@/lib/mockProjectLeads';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  const session = getSession();
  if (!session) return new Response('Unauthorized', { status: 401 });

  await sql`alter table leads add column if not exists lead_category text default 'client'`;
  await sql`alter table leads add column if not exists project_name text`;
  await sql`alter table leads add column if not exists unit_interest text`;

  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || 'client';
  const project = searchParams.get('project') || '';
  const unit = searchParams.get('unit') || '';
  const status = searchParams.get('status') || '';
  const scope = searchParams.get('scope') || 'all'; // 'new' | 'range' | 'all'
  const since = searchParams.get('since'); // ISO date string
  const from = searchParams.get('from');   // YYYY-MM-DD
  const to = searchParams.get('to');       // YYYY-MM-DD

  let allRows = await sql`select * from leads order by created_at desc`;
  if ((!allRows || allRows.length === 0) && process.env.NODE_ENV !== 'production') {
    allRows = [...liveLocalDevLeads, ...liveLocalDevProjectLeads];
  }

  const rows = allRows.filter((r) => {
    const rowCat = r.lead_category || 'client';
    if (rowCat !== category) return false;
    if (project && (r.project_name || '') !== project) return false;
    if (unit && !(r.unit_interest || '').toLowerCase().includes(unit.toLowerCase())) return false;
    if (status && r.status !== status) return false;

    // Date scope filtering
    const rowDate = new Date(r.created_at);
    if (scope === 'new' && since) {
      const sinceDate = new Date(since);
      if (rowDate <= sinceDate) return false;
    }
    if (scope === 'range') {
      if (from) {
        const fromDate = new Date(`${from}T00:00:00`);
        if (rowDate < fromDate) return false;
      }
      if (to) {
        const toDate = new Date(`${to}T23:59:59.999`);
        if (rowDate > toDate) return false;
      }
    }

    return true;
  });

  if (category === 'project') {
    const headers = [
      'ID',
      'Buyer Name',
      'Phone / WhatsApp',
      'City / Country',
      'Project Name',
      'Interested Unit / Category',
      'Date Submitted',
    ];
    const csvRows = [headers.join(',')];

    rows.forEach((r) => {
      const line = [
        r.id,
        r.full_name,
        r.phone,
        r.city || '',
        r.project_name || 'Karachi Enclave',
        r.unit_interest || '',
        r.created_at ? new Date(r.created_at).toLocaleString() : '',
      ]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(',');
      csvRows.push(line);
    });

    const slug = project
      ? project.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      : 'all-projects';
    const todayStr = new Date().toISOString().split('T')[0];

    let filename = `propkads-${slug}-leads-all-${todayStr}.csv`;
    if (scope === 'new') {
      filename = `propkads-${slug}-new-leads-${todayStr}.csv`;
    } else if (scope === 'range' && from && to) {
      filename = `propkads-${slug}-leads-${from}-to-${to}.csv`;
    }

    return new Response(csvRows.join('\n'), {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  }

  const headers = [
    'ID',
    'Full Name',
    'Company / Project',
    'Phone / WhatsApp',
    'City',
    'Property Type',
    'Submission Date',
  ];
  const csvRows = [headers.join(',')];

  rows.forEach((r) => {
    const line = [
      r.id,
      r.full_name,
      r.company_name || '',
      r.phone,
      r.city || '',
      r.inventory_type || '',
      r.created_at ? new Date(r.created_at).toLocaleString() : '',
    ]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(',');
    csvRows.push(line);
  });

  const todayStr = new Date().toISOString().split('T')[0];
  let filename = `propkads-client-leads-all-${todayStr}.csv`;
  if (scope === 'new') {
    filename = `propkads-new-client-leads-${todayStr}.csv`;
  } else if (scope === 'range' && from && to) {
    filename = `propkads-client-leads-${from}-to-${to}.csv`;
  }

  return new Response(csvRows.join('\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
