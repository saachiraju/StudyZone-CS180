'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getPosts } from '@/dependencies/firebase';

const PostBoard = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await getPosts();
      setPosts(data);
    };
    load();
  }, []);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📚 BCOE Discussion Board</h1>
      <Link href="/reddit_chain/new">
        <button className="bg-blue-600 text-white px-4 py-2 rounded mb-6">+ Start a New Thread</button>
      </Link>

      {posts.length === 0 ? (
        <p>No posts yet. Be the first to post!</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.id} className="mb-4 border-b pb-4">
              <Link href={`/reddit_chain/${post.id}`}>
                <p className="text-xl font-semibold hover:underline cursor-pointer">{post.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostBoard;
