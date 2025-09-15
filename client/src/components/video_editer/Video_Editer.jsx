import React, { useState, useEffect } from 'react';

const VideoEditor = ({ videoData, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (videoData) {
      setTitle(videoData.title || '');
      setDescription(videoData.description || '');
    }
  }, [videoData]);

  const handleSave = () => {
    const updatedVideo = {
      ...videoData,
      title,
      description,
    };
    onSave(updatedVideo);
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Edit Video Details</h2>

      <label className="block mb-2 font-medium">Title</label>
      <input
        type="text"
        className="w-full p-2 border rounded mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter video title"
      />

      <label className="block mb-2 font-medium">Description</label>
      <textarea
        className="w-full p-2 border rounded mb-4"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter video description"
      />

      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Changes
      </button>
    </div>
  );
};

export default VideoEditor;