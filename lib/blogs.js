import { sql } from '@/lib/db';
import fs from 'fs/promises';
import path from 'path';
import { BLOG_POSTS } from '@/data/blogs';

const JSON_FILE_PATH = path.join(process.cwd(), 'data', 'blogs-data.json');

// Ensure local json fallback exists
async function getLocalData() {
  try {
    const raw = await fs.readFile(JSON_FILE_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch (_) {}

  // If file doesn't exist or empty, seed with BLOG_POSTS
  try {
    await fs.writeFile(JSON_FILE_PATH, JSON.stringify(BLOG_POSTS, null, 2), 'utf8');
  } catch (_) {}
  return [...BLOG_POSTS];
}

async function saveLocalData(data) {
  try {
    await fs.writeFile(JSON_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to write local blogs json:', e);
  }
}

let tableInitialized = false;

const hasDbConfig = () => Boolean(process.env.DB_NAME || process.env.DATABASE_URL);

async function ensureTable() {
  if (tableInitialized || !hasDbConfig()) return;
  try {
    await sql`
      create table if not exists blogs (
        id text primary key,
        title text not null,
        date text,
        read_time text,
        image text,
        excerpt text,
        full_content text,
        takeaways jsonb,
        is_featured boolean default false,
        is_trending boolean default false,
        created_at timestamptz not null default now(),
        updated_at timestamptz not null default now()
      )
    `;

    // Check if table is empty
    const countRes = await sql`select count(*)::int as count from blogs`;
    if (countRes && countRes[0] && countRes[0].count === 0) {
      for (const p of BLOG_POSTS) {
        await sql`
          insert into blogs (id, title, date, read_time, image, excerpt, full_content, takeaways, is_featured, is_trending)
          values (
            ${p.id},
            ${p.title},
            ${p.date || 'Nov 2025'},
            ${p.readTime || '4 min read'},
            ${p.image || ''},
            ${p.excerpt || ''},
            ${p.fullContent || ''},
            ${JSON.stringify(p.takeaways || [])},
            ${p.isFeatured ? true : false},
            ${p.isTrending ? true : false}
          )
          on conflict (id) do nothing
        `;
      }
    } else {
      // Migrate any legacy placeholder images to the actual news static asset paths
      for (const p of BLOG_POSTS) {
        if (p.image && !p.image.includes('unsplash')) {
          await sql`
            update blogs
            set image = ${p.image}
            where id = ${p.id} and (image like '%unsplash%' or image = '' or image is null)
          `;
        }
      }
    }
    tableInitialized = true;
  } catch (err) {
    console.error('Error ensuring blogs table in Neon:', err);
  }
}

export async function getBlogs() {
  if (hasDbConfig()) {
    try {
      await ensureTable();
      const rows = await sql`
        select id, title, date, read_time, image, excerpt, full_content, takeaways, is_featured, is_trending, created_at, updated_at
        from blogs
        order by created_at asc
      `;
      if (rows && rows.length > 0) {
        return rows.map((r) => {
          const cleanImage =
            r.image && !r.image.includes('unsplash')
              ? r.image
              : `/blogs/${r.id}.jpg`;
          return {
            id: r.id,
            title: r.title,
            date: r.date,
            readTime: r.read_time,
            image: cleanImage,
            excerpt: r.excerpt,
            fullContent: r.full_content,
            takeaways: Array.isArray(r.takeaways)
              ? r.takeaways
              : typeof r.takeaways === 'string'
              ? JSON.parse(r.takeaways || '[]')
              : [],
            isFeatured: !!r.is_featured,
            isTrending: !!r.is_trending,
            createdAt: r.created_at,
            updatedAt: r.updated_at,
          };
        });
      }
    } catch (err) {
      console.error('Failed to get blogs from Neon, falling back to local storage:', err);
    }
  }

  return await getLocalData();
}

export async function saveOrUpdateBlog(blogData) {
  const id = blogData.id || `blog-${Date.now()}`;
  const takeaways = Array.isArray(blogData.takeaways)
    ? blogData.takeaways
    : typeof blogData.takeaways === 'string'
    ? blogData.takeaways.split('\n').map((s) => s.trim()).filter(Boolean)
    : [];
  const isFeatured = !!blogData.isFeatured;
  const isTrending = !!blogData.isTrending;

  if (hasDbConfig()) {
    try {
      await ensureTable();
      if (isFeatured) {
        await sql`update blogs set is_featured = false where id != ${id}`;
      }
      await sql`
        insert into blogs (id, title, date, read_time, image, excerpt, full_content, takeaways, is_featured, is_trending, updated_at)
        values (
          ${id},
          ${blogData.title},
          ${blogData.date || 'Nov 2025'},
          ${blogData.readTime || '4 min read'},
          ${blogData.image || ''},
          ${blogData.excerpt || ''},
          ${blogData.fullContent || ''},
          ${JSON.stringify(takeaways)},
          ${isFeatured},
          ${isTrending},
          now()
        )
        on conflict (id) do update set
          title = excluded.title,
          date = excluded.date,
          read_time = excluded.read_time,
          image = excluded.image,
          excerpt = excluded.excerpt,
          full_content = excluded.full_content,
          takeaways = excluded.takeaways,
          is_featured = excluded.is_featured,
          is_trending = excluded.is_trending,
          updated_at = now()
      `;
      return { success: true, id };
    } catch (err) {
      console.error('Neon save blog error:', err);
    }
  }

  const list = await getLocalData();
  const existingIdx = list.findIndex((b) => b.id === id);
  if (isFeatured) {
    list.forEach((b) => {
      if (b.id !== id) b.isFeatured = false;
    });
  }

  const updatedItem = {
    id,
    title: blogData.title,
    date: blogData.date || 'Nov 2025',
    readTime: blogData.readTime || '4 min read',
    image: blogData.image || '',
    excerpt: blogData.excerpt || '',
    fullContent: blogData.fullContent || '',
    takeaways,
    isFeatured,
    isTrending,
    updatedAt: new Date().toISOString(),
  };

  if (existingIdx >= 0) {
    list[existingIdx] = { ...list[existingIdx], ...updatedItem };
  } else {
    list.unshift(updatedItem);
  }

  await saveLocalData(list);
  return { success: true, id };
}

export async function deleteBlog(id) {
  if (hasDbConfig()) {
    try {
      await ensureTable();
      await sql`delete from blogs where id = ${id}`;
      return { success: true };
    } catch (err) {
      console.error('Neon delete blog error:', err);
    }
  }

  const list = await getLocalData();
  const filtered = list.filter((b) => b.id !== id);
  await saveLocalData(filtered);
  return { success: true };
}
