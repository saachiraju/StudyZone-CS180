// __tests__/uploadRoute.test.ts
import { POST } from '../../app/api/upload/route'; // adjust path as needed
import { handleUpload } from '@vercel/blob/client';

jest.mock('@vercel/blob/client');

describe('POST /api/upload', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully handle an upload', async () => {
    (handleUpload as jest.Mock).mockResolvedValue({
      url: 'https://example.com/fake-upload',
    });

    const request = new Request('http://localhost/api/upload', {
      method: 'POST',
      body: JSON.stringify({
        name: 'testfile.pdf',
        size: 1024,
        type: 'application/pdf',
        folder: 'test-folder',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.url).toBe('https://example.com/fake-upload');
    expect(handleUpload).toHaveBeenCalled();
  });

  it('should handle missing JSON body', async () => {
    const request = new Request('http://localhost/api/upload', {
      method: 'POST',
      body: 'not-json',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    await expect(POST(request)).resolves.toHaveProperty('status', 400);
  });

  it('should default to "default-folder" if no folder provided', async () => {
    (handleUpload as jest.Mock).mockResolvedValue({ url: 'https://example.com/fake-upload' });

    const request = new Request('http://localhost/api/upload', {
      method: 'POST',
      body: JSON.stringify({
        name: 'testfile.pdf',
        size: 1024,
        type: 'application/pdf',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    await POST(request);
    const callArgs = (handleUpload as jest.Mock).mock.calls[0][0];

    const token = await callArgs.onBeforeGenerateToken();
    expect(token.pathname).toBe('default-folder/file');
  });

  it('should catch and return upload errors', async () => {
    (handleUpload as jest.Mock).mockRejectedValue(new Error('Upload failed'));

    const request = new Request('http://localhost/api/upload', {
      method: 'POST',
      body: JSON.stringify({
        name: 'failfile.pdf',
        size: 1024,
        type: 'application/pdf',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.error).toBe('Upload failed');
  });
});