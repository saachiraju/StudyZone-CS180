import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { NextResponse } from 'next/server'
import { list } from '@vercel/blob';

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () =>
        // pathname
        // clientPayload
        {
          // Generate a client token for the browser to upload the file
          // ⚠️ Authenticate and authorize users before generating the token.
          // Otherwise, you're allowing anonymous uploads.
          return {
            allowedContentTypes: ['image/*', 
            'UTType/*', 
            'application/pdf', 
            'text/*',
            'application/octet-stream',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
            addRandomSuffix: true,
            maximumSizeInBytes: 50 * 1024 * 1024, // 50MB
          }
        },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Get notified of client upload completion
        // ⚠️ This will not work during development (localhost),
        // Unless you use ngrok or a similar service to expose and test your local server
        console.log('blob upload completed', blob, tokenPayload)
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 } // The webhook will retry 5 times waiting for a 200
    )
  }
}


async function getBlobLinks() {
  const { blobs } = await list(); // Optionally: list({ prefix: 'your/path' });
  const urls = blobs.map(blob => blob.url);
  console.log(urls);
  return urls;
}

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
