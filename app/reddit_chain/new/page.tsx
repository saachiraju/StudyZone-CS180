'use client';

import { useState } from 'react';
import { addPost } from '@/dependencies/firebase';
import { useAuth } from '@/dependencies/AuthContext';
import { useRouter } from 'next/navigation';

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { currentUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!currentUser) return alert('Please log in');
    if (!title.trim()) return alert('Title required');
    await addPost(title, body, currentUser.uid);
    router.push('/board');
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">New Post</h2>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Post title"
        className="w-full p-2 border rounded mb-4"
      />
      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder="Details (optional)"
        className="w-full p-2 border rounded mb-4"
        rows={6}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Post
      </button>
    </div>
  );
};

export default NewPost;