import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoEditor from '../components/VideoEditor';

const EditVideoPage = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    // Replace with real fetch
    const fetchVideo = async () => {
      const res = await fetch(`/api/videos/${videoId}`);
      const data = await res.json();
      setVideo(data);
    };

    fetchVideo();
  }, [videoId]);

  const handleSave = async (updatedVideo) => {
    await fetch(`/api/videos/${videoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedVideo),
    });
    alert('Video updated!');
  };

  if (!video) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <VideoEditor videoData={video} onSave={handleSave} />
    </div>
  );
};

export default EditVideoPage;