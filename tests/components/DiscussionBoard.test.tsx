import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostBoard from '@/app/board/page';
import NewPostPage from '@/app/board/new/page';
import PostDetailPage from '@/app/board/[postId]/page';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/dependencies/AuthContext';
import * as firebase from '@/dependencies/firebase';

jest.mock('@/dependencies/firebase');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));
jest.mock('@/dependencies/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockRouterPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
(useParams as jest.Mock).mockReturnValue({ postId: '1' });

describe('PostBoard', () => {
  const mockPosts = [
    { id: '1', title: 'Need help with recursion', body: 'Stuck on HW3', classCode: 'CS010B' },
    { id: '2', title: 'Midterm format?', body: 'Is it open note?', classCode: 'CS153' },
  ];

  beforeEach(() => {
    (firebase.getPosts as jest.Mock).mockResolvedValue(mockPosts);
  });

  it('renders and filters posts', async () => {
    render(<PostBoard />);
    expect(await screen.findByText('UCR Discussion Board')).toBeInTheDocument();
    const input = screen.getByPlaceholderText(/search posts/i);
    fireEvent.change(input, { target: { value: 'recursion' } });
    expect(await screen.findByText('Need help with recursion')).toBeInTheDocument();
    expect(screen.queryByText('Midterm format?')).not.toBeInTheDocument();
  });

  it('shows empty fallback when no results match', async () => {
    render(<PostBoard />);
    fireEvent.change(screen.getByPlaceholderText(/search posts/i), { target: { value: 'xyz123' } });
    expect(await screen.findByText('No posts match your search.')).toBeInTheDocument();
  });

  it('has a start new thread button', async () => {
    render(<PostBoard />);
    expect(await screen.findByRole('button', { name: /\+ start a new thread/i })).toBeInTheDocument();
  });
});

describe('NewPostPage', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: { uid: '123', email: 'test@ucr.edu', displayName: 'Test User' },
    });
  });

  it('submits a valid post', async () => {
    (firebase.addPost as jest.Mock).mockResolvedValue(undefined);
    render(<NewPostPage />);

    fireEvent.change(screen.getByPlaceholderText('Enter post title'), {
      target: { value: 'Test Post' },
    });
    fireEvent.change(screen.getByDisplayValue('-- Select a class --'), {
      target: { value: 'CS153' },
    });
    fireEvent.click(screen.getByText('Post'));

    await waitFor(() => {
      expect(firebase.addPost).toHaveBeenCalled();
      expect(mockRouterPush).toHaveBeenCalledWith('/board');
    });
  });

  it('creates anonymous post', async () => {
    (firebase.addPost as jest.Mock).mockResolvedValue(undefined);
    render(<NewPostPage />);

    fireEvent.change(screen.getByPlaceholderText('Enter post title'), {
      target: { value: 'Anonymous Question' },
    });
    fireEvent.change(screen.getByDisplayValue('-- Select a class --'), {
      target: { value: 'CS100' },
    });
    fireEvent.click(screen.getByLabelText(/post anonymously/i));
    fireEvent.click(screen.getByText('Post'));

    await waitFor(() => {
      expect(firebase.addPost).toHaveBeenCalledWith(
        'Anonymous Question',
        '',
        '123',
        'Test User',
        true,
        'CS100'
      );
    });
  });
});

describe('PostDetailPage', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: { uid: '123', displayName: 'Test User' },
    });

    (firebase.getPostById as jest.Mock).mockResolvedValue({
      id: '1',
      title: 'Help with loops',
      body: 'I don’t understand for-loops',
      classCode: 'CS010A',
      author: '123',
      authorName: 'Test User',
    });
  });

  it('shows "no replies" message when there are no comments', async () => {
    (firebase.getComments as jest.Mock).mockResolvedValue([]);
    await waitFor(() => render(<PostDetailPage />));
    expect(await screen.findByText(/no replies yet/i)).toBeInTheDocument();
  });

  it('adds a new comment', async () => {
    (firebase.getComments as jest.Mock).mockResolvedValueOnce([]).mockResolvedValueOnce([
      { id: 'c2', body: 'New comment!', author: '123' },
    ]);
    (firebase.addComment as jest.Mock).mockResolvedValue(undefined);

    await waitFor(() => render(<PostDetailPage />));

    const input = await screen.findByPlaceholderText('Add your comment...');
    fireEvent.change(input, { target: { value: 'New comment!' } });
    fireEvent.click(screen.getByText('Submit'));

    expect(firebase.addComment).toHaveBeenCalled();
    expect(await screen.findByText('New comment!')).toBeInTheDocument();
  });

  it('deletes a comment when confirmed', async () => {
    (firebase.getComments as jest.Mock).mockResolvedValue([
      { id: 'c1', body: 'Try while-loops first!', author: '123' },
    ]);
    (firebase.deleteComment as jest.Mock).mockResolvedValue(undefined);

    window.confirm = jest.fn(() => true);

    await waitFor(() => render(<PostDetailPage />));

    const deleteButtons = await screen.findAllByRole('button', { name: /delete/i });

    await act(async () => {
      fireEvent.click(deleteButtons[1]); // comment delete, not post delete
    });

    expect(firebase.deleteComment).toHaveBeenCalled();
  });

  it('deletes the post when confirmed', async () => {
    (firebase.getComments as jest.Mock).mockResolvedValue([]);
    (firebase.deletePost as jest.Mock).mockResolvedValue(undefined);
    window.confirm = jest.fn(() => true);

    await waitFor(() => render(<PostDetailPage />));
    const deletePostBtn = await screen.findByText('Delete Post');

    await act(async () => {
      fireEvent.click(deletePostBtn);
    });

    expect(firebase.deletePost).toHaveBeenCalledWith('1');
    expect(mockRouterPush).toHaveBeenCalledWith('/board');
  });
});
