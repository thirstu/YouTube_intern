import { API } from "./user.api.js";

const createPlaylist = async () => await API.get("/playlist/create");
const addVideoToPlaylist = async () =>
  await API.get("/playlist/add-video/:videoId");
const getPlaylistById = async () => await API.get("/playlist/get/:playlistId");
const getUserPlaylists = async () => {
  console.log("----getting-getUserPlaylists--");
  const res = await API.get("/playlist/get-playlists");
  console.log(res, "'--------getUserPlaylists--------");

  return res;
};

const updatePlaylist = async () =>
  await API.get("/playlist/update/:playlistId");
const removeVideoFromPlaylist = async () =>
  await API.get("/playlist/remove-video/:videoId");
const deletePlaylist = async () =>
  await API.get("/playlist/delete/:playlistId");

export {
  createPlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  getPlaylistById,
  getUserPlaylists,
  updatePlaylist,
};
