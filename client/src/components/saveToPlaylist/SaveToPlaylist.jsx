import React, { useState } from 'react';

const SaveToPlaylistModal = ({
  videoId,
  isOpen,
  onClose,
  userPlaylists = [],
  onSave,
}) => {
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [playlists, setPlaylists] = useState(userPlaylists);

  const handleToggle = (playlistId) => {
    setSelectedPlaylists((prev) =>
      prev.includes(playlistId)
        ? prev.filter((id) => id !== playlistId)
        : [...prev, playlistId]
    );
  };

  const handleCreatePlaylist = () => {
    const trimmed = newPlaylistName.trim();
    if (!trimmed) return;

    const newPlaylist = {
      id: Date.now().toString(),
      name: trimmed,
    };

    setPlaylists((prev) => [...prev, newPlaylist]);
    setSelectedPlaylists((prev) => [...prev, newPlaylist.id]);
    setNewPlaylistName('');
  };

  const handleSave = () => {
    onSave(videoId, selectedPlaylists);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-lg relative shadow-lg z-50">
        <h2 className="text-xl font-semibold mb-4">Save to Playlist</h2>

        <div className="max-h-48 overflow-y-auto mb-4">
          {playlists.length > 0 ? (
            playlists.map((playlist) => (
              <label
                key={playlist.id}
                className="flex items-center space-x-2 mb-2"
              >
                <input
                  type="checkbox"
                  checked={selectedPlaylists.includes(playlist.id)}
                  onChange={() => handleToggle(playlist.id)}
                />
                <span>{playlist.name}</span>
              </label>
            ))
          ) : (
            <p className="text-sm text-gray-500">No playlists found.</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            placeholder="New playlist name"
            className="border px-3 py-2 rounded w-full"
          />
          <button
            onClick={handleCreatePlaylist}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            + Create new playlist
          </button>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:underline"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveToPlaylistModal;