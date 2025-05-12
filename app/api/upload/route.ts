import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody & { folder?: string };

  //const folder = body.folder || 'default-folder';
  const folder = 'CS010A';

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        return {
          allowedContentTypes: [
            'image/*',
            'UTType/*',
            'application/pdf',
            'text/*',
            'application/octet-stream',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          ],
          addRandomSuffix: true,
          maximumSizeInBytes: 50 * 1024 * 1024, // 50MB
          // Here's the important part: define the upload path with folder
          pathname: `${folder}/file`,
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('blob upload completed', blob, tokenPayload);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
