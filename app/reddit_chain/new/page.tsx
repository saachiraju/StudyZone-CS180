'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/dependencies/AuthContext';
import { addPost } from '@/dependencies/firebase';

const NewPostPage = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async () => {
    if (!currentUser) return alert('Please log in first!');
    if (!title.trim()) return alert('Title is required!');
    await addPost(title, body, currentUser.uid);
    router.push('/reddit-chain');
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter post title"
        className="w-full p-2 border rounded mb-4"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write more details (optional)"
        className="w-full p-2 border rounded mb-4"
        rows={5}
      />
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
        Post
      </button>
    </div>
  );
};

export default NewPostPage;