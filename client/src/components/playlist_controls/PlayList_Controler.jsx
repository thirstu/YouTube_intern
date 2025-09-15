import { useState, useEffect } from "react";
import { 
  createUserPlaylist,
  toggleUserPlaylist 
} from "../../reducers/playlist.reducer";
import { useDispatch, useSelector } from "react-redux";

export default function PlayList_SaveOptions({ videoId }) {
  const { playlists: userPlaylists } = useSelector((state) => state.playlist);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState("");
  const [showInput, setShowInput] = useState(false);

  // 🔄 make sure playlists always sync with Redux
  useEffect(() => {
     dispatch(
      toggleUserPlaylist({
        videoId
        // true → add, false → remove
      })
    );
    // If you want to auto-sync with Redux store state
  }, [newPlaylist]);

  const handleCreate = () => {
    if (newPlaylist.trim()) {
      dispatch(createUserPlaylist({ name: newPlaylist, videoId }));
      setNewPlaylist("");
      setShowInput(false);
    }
  };

  const toggleCheckbox = (playlist) => {
    dispatch(
      toggleUserPlaylist({
        videoId,
        playlistId: playlist._id,
        toggle: !playlist.selected, // true → add, false → remove
      })
    );
  };

  return (
    <div className="relative inline-block text-left">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        🎵
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-200 shadow-lg rounded-xl z-20 p-3">
          <ul className="space-y-2">
            {/* Show playlists with checkboxes */}
            {userPlaylists.length > 0 &&
              userPlaylists.map((pl, idx) => (
                <li key={pl._id || idx} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={pl.selected || false}
                    onChange={() => toggleCheckbox(pl)}
                    className="cursor-pointer"
                  />
                  <span>{pl.name}</span>
                </li>
              ))}

            {/* Create New Playlist option */}
            {!showInput ? (
              <li>
                <button
                  onClick={() => setShowInput(true)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                >
                  📂 Create New Playlist
                </button>
              </li>
            ) : (
              <li className="flex flex-col gap-2">
                <input
                  type="text"
                  value={newPlaylist}
                  onChange={(e) => setNewPlaylist(e.target.value)}
                  placeholder="Playlist name"
                  className="w-full border px-3 py-2 rounded-md text-sm dark:bg-gray-700 dark:border-gray-600"
                />
                <button
                  onClick={handleCreate}
                  className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Create
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
