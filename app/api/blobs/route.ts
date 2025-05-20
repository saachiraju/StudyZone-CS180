import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const folder = searchParams.get('folder') || '';

    // Ensure prefix ends with slash if folder is specified
    const prefix = folder ? `${folder}/` : '';

    const { blobs } = await list({ prefix });
    const urls = blobs
      .map(blob => blob.url)
      .filter(url => !url.endsWith('/'));

    return NextResponse.json({ urls });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
