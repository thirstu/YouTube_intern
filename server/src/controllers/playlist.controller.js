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
        description: description,
        owner: user._id,
        videos:videoId?videoId:[],

    });

    return res
    .status(200)
    .json(new ApiResponse(200,createdPlaylist," createPlaylist successfully"))

})

const getUserPlaylists = asyncHandler(async (req, res) => {
    console.log("getUserPlaylists");

    const userId = req.user._id;
    //TODO: get user playlists
    const userPlaylists = await Playlist.find({owner:userId});

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
    const {playlistId} = req.params
    const {name, description} = req.body
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



export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    updatePlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
}