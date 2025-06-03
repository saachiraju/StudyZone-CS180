'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getPostById, getComments, addComment } from '@/dependencies/firebase';
import { useAuth } from '@/dependencies/AuthContext';

const PostDetailPage = () => {
  const { postId } = useParams();
  const { currentUser } = useAuth();
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
    if (!currentUser) return alert("Please log in");
    if (!newComment.trim()) return;
    await addComment(postId as string, newComment, currentUser.uid);
    setNewComment('');
    const updated = await getComments(postId as string);
    setComments(updated);
  };

  if (!post) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <p className="mb-6">{post.body}</p>

      <div className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add your comment..."
          className="w-full p-2 border rounded mb-2"
          rows={3}
        />
        <button
          onClick={handleComment}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>

      <hr className="my-4" />
      <h3 className="text-xl font-semibold mb-2">Replies</h3>
      {comments.map(c => (
        <div key={c.id} className="p-3 mb-3 bg-gray-100 rounded">
          {c.body}
        </div>
      ))}
    </div>
  );
};

export default PostDetailPage;
