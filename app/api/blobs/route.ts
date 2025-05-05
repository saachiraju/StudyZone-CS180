import { NextResponse } from 'next/server'
import { list } from '@vercel/blob';

export async function GET(): Promise<NextResponse> {
  try {
    const { blobs } = await list(); // Optional: list({ prefix: 'your/path' });
    const urls = blobs.map(blob => blob.url);
    return NextResponse.json({ urls });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
