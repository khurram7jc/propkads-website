import { neon } from '@neondatabase/serverless';

// DATABASE_URL comes from your Neon project (set in Vercel env variables)
const dbUrl = process.env.DATABASE_URL;
export const sql = dbUrl
  ? neon(dbUrl)
  : async () => [];

