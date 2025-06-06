import { GET } from '../../app/api/blobs/route'; // adjust this path
import { list } from '@vercel/blob';

jest.mock('@vercel/blob', () => ({
  list: jest.fn(),
}));

describe('GET handler', () => {
  const mockList = list as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns URLs of blobs for a given folder', async () => {
    mockList.mockResolvedValueOnce({
      blobs: [
        { url: 'https://example.com/folder/file1.txt' },
        { url: 'https://example.com/folder/file2.pdf' },
        { url: 'https://example.com/folder/subfolder/' }, // should be filtered
      ],
    });

    const req = new Request('http://localhost/api?folder=folder');
    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({
      urls: [
        'https://example.com/folder/file1.txt',
        'https://example.com/folder/file2.pdf',
      ],
    });
    expect(mockList).toHaveBeenCalledWith({ prefix: 'folder/' });
  });

  it('returns an empty folder if no blobs exist', async () => {
    mockList.mockResolvedValueOnce({ blobs: [] });

    const req = new Request('http://localhost/api?folder=empty');
    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ urls: [] });
  });

  it('returns an error response if list throws', async () => {
    mockList.mockRejectedValueOnce(new Error('Internal error'));

    const req = new Request('http://localhost/api?folder=error');
    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json).toEqual({ error: 'Internal error' });
  });
});