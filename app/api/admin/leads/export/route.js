import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = getSession();
  if (!session) return new Response('Unauthorized', { status: 401 });

  const rows = await sql`select * from leads order by created_at desc`;

  const headers = ['ID', 'Full Name', 'Company', 'Phone', 'City', 'Inventory Type', 'Status', 'Created At'];
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

  const csv = csvRows.join('\n');

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="propkads-leads.csv"',
    },
  });
}
