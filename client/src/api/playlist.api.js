import { API } from "./user.api.js";

const createPlaylist = async ({ name, description, videoId }) => {
  console.log(name, description, videoId);
  return await API.post(
    "/playlist/create",
    {
      name, // required
      description, // optional
    },
    {
      params: {
        videoId, // optional, will be sent as query string
      },
    }
  );
};
const addVideoToPlaylist = async ({videoId, playlistId}) => {
  console.log(videoId, playlistId);
  return await API.post(
    `/playlist/add-video/${videoId}`, // videoId in param
    {}, // no body
    {
      params: {
        playlistId, // playlistId in query
      },
    }
  );
};
const getPlaylistById = async () => await API.get("/playlist/get/:playlistId");
const getUserPlaylists = async () => {
  console.log("----getting-getUserPlaylists--");
  const res = await API.get("/playlist/get-playlists");
  console.log(res, "'--------getUserPlaylists--------");

  return res;
};

const updatePlaylist = async ({ playlistId,
       
        name}) =>{

  return await API.post(`/playlist/update/${playlistId}`,
    {name}
  )
};
const removeVideoFromPlaylist = async () =>
  await API.get("/playlist/remove-video/:videoId");
const deletePlaylist = async ({playlistId}) =>{
  console.log(playlistId);

  return await API.get(`/playlist/delete/${playlistId}`)};
const togglePlaylist = async ({ videoId, playlistId, toggle }) => {
  console.log(videoId, playlistId, toggle);
  return await API.patch("/playlist/playlistCheckboxToggle", {
    videoId,
    playlistId,
    toggle,
  });
};

export {
  createPlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  getPlaylistById,
  getUserPlaylists,
  updatePlaylist,
  togglePlaylist
};
