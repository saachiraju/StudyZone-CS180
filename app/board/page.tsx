'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getPosts } from '@/dependencies/firebase';

const PostBoard = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const load = async () => {
      const data = await getPosts();
      setPosts(data);
    };
    load();
  }, []);

  const filteredPosts = posts.filter(post =>
    (post.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (post.body?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (post.classCode?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-purple-50 min-h-screen py-10 px-4">
  <div className="max-w-4xl mx-auto">
    <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-8 flex items-center justify-center gap-2">
      📚 <span>UCR Discussion Board</span>
    </h1>

    {/* Search Bar */}
    <div className="mb-6">
      <input
        type="text"
        placeholder="🔍 Search posts by title, class, or content..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm placeholder-gray-500"
      />
    </div>

    <div className="flex justify-end mb-8">
      <Link href="/board/new">
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2 rounded-lg shadow">
          + Start a New Thread
        </button>
      </Link>
    </div>

    {filteredPosts.length === 0 ? (
      <p className="text-center text-gray-500">No posts match your search.</p>
    ) : (
      Object.entries(
        filteredPosts.reduce((acc: Record<string, any[]>, post) => {
          const classCode = post.classCode || 'Uncategorized';
          if (!acc[classCode]) acc[classCode] = [];
          acc[classCode].push(post);
          return acc;
        }, {})
      ).map(([classCode, classPosts]) => (
        <div key={classCode} className="mb-10">
          <h2 className="text-xl font-bold text-purple-700 uppercase tracking-wide mb-3 border-b border-purple-300 pb-1">
            {classCode}
          </h2>
          <ul className="space-y-4">
            {classPosts.map((post) => (
              <li
                key={post.id}
                className="p-4 bg-white rounded-md shadow hover:shadow-md transition"
              >
                <Link href={`/board/${post.id}`}>
                  <p className="text-lg font-medium text-purple-800 hover:underline cursor-pointer">
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
</div>

  );
  
};

export default PostBoard;
