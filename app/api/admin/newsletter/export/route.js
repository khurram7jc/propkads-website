import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = getSession();
  if (!session) return new Response('Unauthorized', { status: 401 });

  const rows = await sql`select * from newsletter_subscribers order by created_at desc`;

  const headers = ['ID', 'Email', 'Subscribed At'];
  const csvRows = [headers.join(',')];

  rows.forEach((r) => {
    const line = [r.id, r.email, r.created_at].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',');
    csvRows.push(line);
  });

  return new Response(csvRows.join('\n'), {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="propkads-newsletter-subscribers.csv"',
    },
  });
}
