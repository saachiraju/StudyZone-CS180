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
  const [classCode, setClassCode] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  const handleSubmit = async () => {
    if (!currentUser) return alert('Please log in first!');
    if (!title.trim()) return alert('Title is required!');
    if (!classCode) return alert('Please select a class!');
    const displayName = currentUser.displayName || currentUser.email || 'User';

    await addPost(title, body, currentUser.uid, displayName, anonymous, classCode);
    router.push('/board');
  };

  return (
    <div className="bg-[#EBDCF9] min-h-screen py-10 px-4 text-gray-800">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-purple-800">Create a New Post</h2>

        {/* Class Dropdown */}
        <select
          value={classCode}
          onChange={(e) => setClassCode(e.target.value)}
          className="w-full p-3 mb-4 rounded border border-purple-300 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300"
        >
          <option value="">-- Select a class --</option>
          <option value="GENERAL">📌 General Question (not class-specific)</option>
          <option value="CS010A">CS010A</option>
          <option value="CS010B">CS010B</option>
          <option value="CS010C">CS010C</option>
          <option value="CS030">CS030</option>
          <option value="CS061">CS061</option>
          <option value="CS100">CS100</option>
          <option value="CS141">CS141</option>
          <option value="CS153">CS153</option>
          <option value="CS161">CS161</option>
          <option value="CS166">CS166</option>
          <option value="CS171">CS171</option>
          <option value="CS180">CS180</option>
          <option value="EE100A">EE100A</option>
          <option value="EE100B">EE100B</option>
          <option value="EE110A">EE110A</option>
          <option value="EE110B">EE110B</option>
          <option value="EE120A">EE120A</option>
          <option value="EE120B">EE120B</option>
          <option value="EE132">EE132</option>
          <option value="EE141">EE141</option>
          <option value="EE144">EE144</option>
          <option value="EE175A">EE175A</option>
          <option value="ME010">ME010</option>
          <option value="ME018">ME018</option>
          <option value="ME104">ME104</option>
          <option value="ME114">ME114</option>
          <option value="ME118">ME118</option>
          <option value="ME132">ME132</option>
          <option value="CHE100">CHE100</option>
          <option value="CHE110A">CHE110A</option>
          <option value="CHE110B">CHE110B</option>
          <option value="CHE120A">CHE120A</option>
          <option value="CHE120B">CHE120B</option>
          <option value="ENVE100">ENVE100</option>
          <option value="ENVE110">ENVE110</option>
          <option value="ENVE130">ENVE130</option>
          <option value="BIME050">BIME050</option>
          <option value="BIME110">BIME110</option>
          <option value="BIME116">BIME116</option>
          <option value="BIME120">BIME120</option>
          <option value="ENGR001">ENGR001</option>
          <option value="ENGR154">ENGR154</option>
        </select>

        {/* Title */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          className="w-full p-3 mb-4 rounded border border-purple-300 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300"
        />

        {/* Body */}
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write more details (optional)"
          className="w-full p-3 mb-4 rounded border border-purple-300 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300"
          rows={5}
        />

        {/* Anonymity Checkbox */}
        <label className="flex items-center gap-2 mb-6 text-purple-700">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            className="accent-purple-600"
          />
          Post anonymously
        </label>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded shadow"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default NewPostPage;
