import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { fullName, companyName, phone, city, inventoryType } = body;

    const result = await pool.query(
      `INSERT INTO inquiries (full_name, company_name, phone, city, inventory_type)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [fullName, companyName, phone, city, inventoryType]
    );

    return Response.json({ success: true, id: result.rows[0].id });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
