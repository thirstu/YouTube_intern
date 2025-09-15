import mongoose, {isValidObjectId} from "mongoose"
// import {Playlist} from "../models/playlist.model.js"
// import { ApiError } from "../utils/apiError.js"
// import { ApiResponse } from "../utils/apiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

import { Playlist } from "../models/playlist.models.js"
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const createPlaylist = asyncHandler(async (req, res) => {
    console.log("hello");
    const user=req.user;
    const {name, description} = req.body;
    const {videoId}=req.query;

    console.log(videoId);

   

    



    //TODO: create playlist 
    const createdPlaylist = await Playlist.create({
        name: name,
        description: description?description:"",
        owner: user._id,
        videos:videoId?videoId:[],

    });
    console.log("'createPlaylist----",createdPlaylist);

    return res
    .status(200)
    .json(new ApiResponse(200,createdPlaylist," createPlaylist successfully"))

})

const getUserPlaylists = asyncHandler(async (req, res) => {
    console.log("getUserPlaylists");

    const userId = req.user._id;
    //TODO: get user playlists
    const userPlaylists = await Playlist.find({owner:userId});
    console.log("getUserPlaylists---",userPlaylists);


    return res
    .status(200)
    .json(new ApiResponse(200,userPlaylists," fetched userPlaylists successfully"));
})

const getPlaylistById = asyncHandler(async (req, res) => {
    // const user=req.user;
    const {playlistId} = req.params
    //TODO: get playlist by id
    const playlist = await Playlist.findById(playlistId);

    return res
    .status(200)
    .json(new ApiResponse(200,playlist," fetched playlist by id successfully"));

})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const { videoId} = req.params;
    const {playlistId} = req.query;
    console.log(videoId, playlistId);

    const playlist=await Playlist.findByIdAndUpdate(playlistId,{$addToSet:{videos:videoId}},{new:true})

    if (!playlist) {
        return res.status(404).json(new ApiResponse(404, null, "Playlist not found"));
    }

    return res
    .status(200)
    .json(new ApiResponse(200,playlist," added video to playlist by id successfully"));
})

const updatePlaylist = asyncHandler(async (req, res) => {
    console.log("hello");
    const {playlistId} = req.params;
    const {name, description} = req.body;
    //TODO: update playlist

    const playlist=await Playlist.findByIdAndUpdate(playlistId,{name:name,
        description:description,
    },{new:true})

    if (!playlist) {
        return res.status(404).json(new ApiResponse(404, null, "Playlist not found"));
    }

    return res
    .status(200)
    .json(new ApiResponse(200,playlist," updated playlist successfully"));

})
const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { videoId} = req.params;
    const {playlistId} = req.query;
    console.log(videoId, playlistId);
    // TODO: remove video from playlist
    const playlist=await Playlist.findByIdAndUpdate(playlistId,{$pull:{videos:videoId}},{new:true})

    if (!playlist) {
        return res.status(404).json(new ApiResponse(404, null, "Playlist not found"));
    }

    return res
    .status(200)
    .json(new ApiResponse(200,playlist," removed video from playlist by id successfully"));


})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    // TODO: delete playlist
    const playlist=await Playlist.findByIdAndDelete(playlistId);

    if (!playlist) {
        return res.status(404).json(new ApiResponse(404, null, "Playlist not found"));
    }

    return res
    .status(200)
    .json(new ApiResponse(200,playlist," removed playlist by id successfully"));
})

const playlistCheckboxToggle = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { videoId, playlistId, toggle } = req.body; 
  console.log("138",videoId, playlistId, toggle);
  // toggle can be true/false
console.log(!videoId || !playlistId);
console.log(!videoId );
console.log( !playlistId);
  if (!videoId ) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "videoId are required"));
  }
  console.log("146 !videoId || !playlistId");

  // find the target playlist
  let targetPlaylist;
 if(playlistId){
    targetPlaylist = await Playlist.findOne({ _id: playlistId, owner: userId });
  if (!targetPlaylist) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Playlist not found"));
  }
  console.log("155 // find the target playlist");
 }

  // Add or remove based on toggle
  let updatedPlaylist;
  if (toggle) {
    // if toggle true → add video
    updatedPlaylist = await Playlist.findByIdAndUpdate(
      playlistId,
      { $addToSet: { videos: videoId } },
      { new: true }
    );
  } else if(playlistId) {
    // if toggle false → remove video
    updatedPlaylist = await Playlist.findByIdAndUpdate(
      playlistId,
      { $pull: { videos: videoId } },
      { new: true }
    );
  }
  console.log("174 Add or remove based on toggle",updatedPlaylist);

  // fetch all playlists of user
  const userPlaylists = await Playlist.find({ owner: userId }).lean();
  console.log("178 Add or remove based on toggle");

  // mark selected property based on whether playlist has this video
  const playlistsWithSelected = userPlaylists.map((pl) => ({
    ...pl,
    selected: pl.videos.some(
      (vid) => vid.toString() === videoId.toString()
    ),
  }));
  console.log(playlistsWithSelected);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {
          updatedPlaylist,
          playlists: playlistsWithSelected,
        },
        "Playlist toggle handled successfully"
      )
    );
});

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    updatePlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    playlistCheckboxToggle
}