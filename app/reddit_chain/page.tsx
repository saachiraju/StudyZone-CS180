'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getPosts } from '@/dependencies/firebase';

const PostBoard = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getPosts();
      setPosts(data);
    };
    fetch();
  }, []);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Discussion Board</h1>
      <Link href="/board/new" className="text-blue-600 underline mb-4 block">+ Create a New Post</Link>

      <ul>
        {posts.map(post => (
          <li key={post.id} className="mb-4 border-b pb-4">
            <Link href={`/board/${post.id}`}>
              <span className="text-xl font-semibold hover:underline cursor-pointer">
                {post.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostBoard;