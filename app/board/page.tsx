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
      <h1 className="text-3xl font-bold mb-6">📚 UCR Discussion Board</h1>
      <Link href="/board/new">
        <button className="bg-blue-600 text-white px-4 py-2 rounded mb-6">
          + Start a New Thread
        </button>
      </Link>
  
      {posts.length === 0 ? (
        <p>No posts yet. Be the first to post!</p>
      ) : (
        Object.entries(
          posts.reduce((acc: Record<string, any[]>, post) => {
            const classCode = post.classCode || 'Uncategorized';
            if (!acc[classCode]) acc[classCode] = [];
            acc[classCode].push(post);
            return acc;
          }, {})
        ).map(([classCode, classPosts]) => (
          <div key={classCode} className="mb-8">
            <h2 className="text-xl font-bold mb-2">{classCode}</h2>
            <hr className="mb-4 border-gray-300" />
            <ul>
              {classPosts.map((post) => (
                <li key={post.id} className="mb-4 border-b pb-4">
                  <Link href={`/board/${post.id}`}>
                    <p className="text-lg font-medium hover:underline cursor-pointer">
                      {post.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default PostBoard;
