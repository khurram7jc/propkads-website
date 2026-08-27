import { neon } from '@neondatabase/serverless';

// DATABASE_URL comes from your Neon project (set in Vercel env variables)
export const sql = neon(process.env.DATABASE_URL);
