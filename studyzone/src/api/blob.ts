import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export async function GET(req: Request) {
  try {
    // Get the 'folder' parameter from the query string
    const { searchParams } = new URL(req.url);
    const folder = searchParams.get('folder') || '';

    // Create the prefix for Vercel Blob based on the folder
    const prefix = folder ? `${folder}/` : '';

    // List the blobs in the specified folder
    const { blobs } = await list({ prefix });

    // Get the URLs of the blobs, filtering out directories
    const urls = blobs
      .map((blob) => blob.url)
      .filter((url) => !url.endsWith('/'));

    // Return the list of blob URLs in the response
    return NextResponse.json({ urls });
  } catch (error) {
    // If there is an error, return it in the response
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
