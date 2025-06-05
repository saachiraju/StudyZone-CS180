'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  getPostById,
  getComments,
  addComment,
  deletePost,
  deleteComment,
} from '@/dependencies/firebase';
import { useAuth } from '@/dependencies/AuthContext';

const PostDetailPage = () => {
  const { postId } = useParams();
  const { currentUser } = useAuth();
  const router = useRouter();

  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const load = async () => {
      const postData = await getPostById(postId as string);
      const commentData = await getComments(postId as string);
      setPost(postData);
      setComments(commentData);
    };
    if (postId) load();
  }, [postId]);

  const handleComment = async () => {
    if (!currentUser) return alert('Please log in');
    if (!newComment.trim()) return;
    await addComment(postId as string, newComment, currentUser.uid);
    setNewComment('');
    const updated = await getComments(postId as string);
    setComments(updated);
  };

  if (!post) return <div className="p-8 text-gray-700">Loading...</div>;

  return (
    <div className="bg-[#EBDCF9] min-h-screen py-10 px-4 text-gray-800">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-2 text-purple-800">{post.title}</h2>
        <p className="text-sm text-purple-500 mb-1">Class: {post.classCode}</p>
        <p className="text-sm text-purple-500 mb-4">
          Posted by: {post.authorName || 'Unknown'}
        </p>
        <p className="text-lg mb-6">{post.body}</p>

        {currentUser?.uid === post.author && (
          <button
            onClick={async () => {
              if (confirm('Delete this post?')) {
                await deletePost(postId as string);
                router.push('/board');
              }
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mb-6"
          >
            Delete Post
          </button>
        )}

        <div className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add your comment..."
            className="w-full p-3 rounded bg-purple-50 border border-purple-200 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
            rows={3}
          />
          <button
            onClick={handleComment}
            className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded shadow"
          >
            Submit
          </button>
        </div>

        <hr className="my-6 border-purple-300" />
        <h3 className="text-2xl font-semibold mb-4 text-purple-700">Replies</h3>

        {comments.length === 0 && (
          <p className="text-purple-400">No replies yet. Be the first to comment!</p>
        )}

        {comments.map((c) => (
          <div
            key={c.id}
            className="bg-purple-100 p-4 rounded-lg text-gray-800 shadow mb-3"
          >
            <p>{c.body}</p>
            {currentUser?.uid === c.author && (
              <button
                onClick={async () => {
                  if (confirm('Delete this comment?')) {
                    await deleteComment(postId as string, c.id);
                    const updated = await getComments(postId as string);
                    setComments(updated);
                  }
                }}
                className="text-red-600 text-sm mt-2 underline"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetailPage;
