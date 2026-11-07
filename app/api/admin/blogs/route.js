import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getBlogs, saveOrUpdateBlog, deleteBlog } from '@/lib/blogs';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = getSession();
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  try {
    const blogs = await getBlogs();
    return NextResponse.json({ success: true, blogs });
  } catch (err) {
    console.error('Admin GET blogs error:', err);
    return NextResponse.json({ success: false, error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(req) {
  const session = getSession();
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    if (!body.title || !body.title.trim()) {
      return NextResponse.json({ success: false, error: 'Title is required' }, { status: 400 });
    }

    const res = await saveOrUpdateBlog(body);
    return NextResponse.json(res);
  } catch (err) {
    console.error('Admin POST blog error:', err);
    return NextResponse.json({ success: false, error: 'Failed to save blog' }, { status: 500 });
  }
}

export async function PUT(req) {
  const session = getSession();
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: 'Article ID is required' }, { status: 400 });
    }

    const res = await saveOrUpdateBlog(body);
    return NextResponse.json(res);
  } catch (err) {
    console.error('Admin PUT blog error:', err);
    return NextResponse.json({ success: false, error: 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(req) {
  const session = getSession();
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Article ID is required' }, { status: 400 });
    }

    const res = await deleteBlog(id);
    return NextResponse.json(res);
  } catch (err) {
    console.error('Admin DELETE blog error:', err);
    return NextResponse.json({ success: false, error: 'Failed to delete blog' }, { status: 500 });
  }
}
