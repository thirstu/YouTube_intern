import React, { useState } from "react";
import { RxDotsVertical } from "react-icons/rx";
import "./Playlist_Card.css";
import { useDispatch } from "react-redux";
import { deletePlay, updatePlay } from "../../reducers/playlist.reducer";

function PlaylistCard({ playlist, onDelete }) {
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(playlist?.title || "");
  const [editName, setEditName] = useState(playlist?.name || "");

  const removePlaylist = ({ playlistId }) => {
    dispatch(deletePlay({ playlistId }));
  };

  const handleSave = () => {
    // if (!editTitle.trim()) return;

    dispatch(
      updatePlay({
        playlistId: playlist?._id,
        // title: editTitle,
        name: editName,
      })
    );

    setIsEditing(false);
  };

  return (
    <div
      key={playlist?._id}
      className="flex items-center justify-between bg-white dark:bg-gray-900 shadow-md rounded-2xl p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer relative"
    >
      {/* Left Section: Thumbnail & Details */}
      <div className="flex items-center gap-3">
        {/* Thumbnail */}
        <div className="relative w-28 h-20 bg-gray-300 rounded-lg overflow-hidden flex items-center justify-center text-sm text-gray-600">
          {playlist?.thumbnail ? (
            <img
              src={playlist?.thumbnail}
              alt={playlist?.name}
              className="w-full h-full object-cover"
            />
          ) : (
            "No Thumbnail"
          )}

          {/* Video count overlay */}
          <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-2 py-0.5 rounded">
            {playlist?.videos?.length || 0} videos
          </div>
        </div>

        {/* Playlist Details / Edit Mode */}
        <div className="flex flex-col">
          {isEditing ? (
            <>
              {/* <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="border rounded px-2 py-1 text-sm mb-1 dark:bg-gray-700 dark:text-white"
              /> */}
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="border rounded px-2 py-1 text-sm dark:bg-gray-700 dark:text-white"
              />

              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleSave}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 bg-gray-400 text-white text-sm rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h4 className="font-semibold text-gray-900 dark:text-white truncate max-w-[160px]">
                {playlist?.title}
              </h4>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {playlist?.name || "Unknown"}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Right Section: Options Menu */}
      {!isEditing && (
        <div className="relative">
          <RxDotsVertical
            className="text-gray-600 dark:text-gray-300 cursor-pointer text-xl"
            onClick={() => setShowOptions((prev) => !prev)}
          />
          {showOptions && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-10">
              <button
                onClick={() => removePlaylist({ playlistId: playlist?._id })}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Delete Playlist
              </button>
              <button
                onClick={() => {
                  setIsEditing(true);
                  setShowOptions(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Edit Playlist
              </button>
              <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                Share
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PlaylistCard;
