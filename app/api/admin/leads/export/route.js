import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';

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

  const allRows = await sql`select * from leads order by created_at desc`;
  const rows = allRows.filter((r) => {
    const rowCat = r.lead_category || 'client';
    if (rowCat !== category) return false;
    if (project && (r.project_name || '') !== project) return false;
    if (unit && !(r.unit_interest || '').toLowerCase().includes(unit.toLowerCase())) return false;
    if (status && r.status !== status) return false;
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
      'Status',
      'Created At',
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
        r.status,
        r.created_at,
      ]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(',');
      csvRows.push(line);
    });

    const slug = project
      ? project.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      : 'all-projects';

    return new Response(csvRows.join('\n'), {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="propkads-project-leads-${slug}.csv"`,
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
    'Status',
    'Created At',
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
      r.status,
      r.created_at,
    ]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(',');
    csvRows.push(line);
  });

  return new Response(csvRows.join('\n'), {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="propkads-client-leads.csv"',
    },
  });
}
