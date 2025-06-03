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
    <div style={{ padding: '2rem' }}>
      <h1>Discussion Board</h1>
      <Link href="/board/new">
        <button style={{ marginBottom: '1rem' }}>+ New Post</button>
      </Link>
      <ul>
        {posts.map(post => (
          <li key={post.id} style={{ marginBottom: '1rem' }}>
            <Link href={`/board/${post.id}`}>
              <div style={{ fontWeight: 'bold', cursor: 'pointer' }}>{post.title}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostBoard;
