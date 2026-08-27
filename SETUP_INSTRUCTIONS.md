# Propkads — Complete Website + Admin Panel

Next.js + Neon (Postgres) + Vercel + GitHub. This is a complete, working project —
push it to GitHub as-is and connect it to Vercel.

## What's inside
- **Public website** (`app/page.js`) — clean, minimal, corporate design. Text pulled from the
  database so you can edit it later from the admin panel without touching code.
- **Admin panel** (`/admin`) — multi-user login (you + team members).
  - **Leads tab**: search, filter by status, click a lead to open full details — edit any field,
    change status (New → Contacted → Site Visit → Booked → Closed), add follow-up notes,
    one-tap Call/WhatsApp links, delete, export all leads to CSV.
  - **Content tab**: edit site text (hero heading, service descriptions, etc.) — click outside a
    field to save.
  - **Team tab** (admin role only): add or remove team members. Each person gets their own
    email + password.

## 1. Create a GitHub repo and add these files
Push this entire folder as a new repository (or replace your existing project files with these).

## 2. Create a Neon database
1. Go to [neon.tech](https://neon.tech), create a free project.
2. Open **SQL Editor** and run the entire contents of `schema.sql`.
3. Copy your **connection string** (use the "pooled connection" if offered).

## 3. Create your first admin login
You need Node.js installed on your computer for this one-time step.
```
node scripts/hash-password.js "yourpassword"
```
This prints a hash. Copy it, then go back to Neon's SQL Editor and run:
```sql
insert into users (name, email, password_hash, role)
values ('Khurram', 'you@propkads.com', 'PASTE_THE_HASH_HERE', 'admin');
```
Once logged in, you can add all other team members directly from the **Team** tab —
no more manual SQL needed after this first one.

## 4. Set environment variables
Copy `.env.local.example` to `.env.local` and fill in:
- `DATABASE_URL` — from Neon
- `SESSION_SECRET` — any long random string (e.g. generate one at random.org or just mash your keyboard for 40+ characters)

Add the same two variables in **Vercel → Project → Settings → Environment Variables**.

## 5. Deploy
1. Push this repo to GitHub.
2. In Vercel, "Import Project" → select your GitHub repo.
3. Add the environment variables (step 4) before or after the first deploy.
4. Vercel will auto-detect Next.js and deploy. Every future `git push` auto-deploys.

## 6. Using it day-to-day
- Public site: your domain, e.g. `https://propkads.com`
- Admin panel: `https://propkads.com/admin`
- New leads from the contact form appear instantly in the **Leads** tab.

## Notes
- The logo and favicon already in `/public` are the ones you provided — replace those files
  any time to change branding without touching code.
- Passwords are hashed with Node's built-in `crypto.scrypt` — no extra dependency, no plaintext
  passwords stored anywhere.
- Only `admin` role users can see the Team tab and add/remove people. `team` role users can
  manage leads and content but not add other logins.
