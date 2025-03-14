import mongoose, {isValidObjectId} from "mongoose"
// import {Video} from "../models/video.model.js"
// import {User} from "../models/user.model.js"
// import { ApiError } from "../utils/apiError.js"
// import { ApiResponse } from "../utils/apiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
// import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { Video } from "../models/video.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const getAllVideos = asyncHandler(async (req, res) => {
/**
 * $regex (Regular Expression) is used in MongoDB to search for text patterns inside string fields.
It allows partial matching instead of requiring an exact match.
What is $options: "i"?
The i option makes the search case-insensitive.
Without "i", MongoDB would only match exact case.
 * 
 * 
 * ✅ sortBy → The field to sort by (e.g., "views", "createdAt", "likes").
✅ sortType → Determines ascending ("asc") or descending ("desc") order.
✅ [sortBy] → Uses computed property names in JavaScript to dynamically set the field.
✅ ? -1 : 1 → Converts "desc" to -1 (descending) and "asc" to 1 (ascending).
 */

    const { page = 1, limit = 10, query, sortBy, sortType, userId,category } = req.query;

    let filter;

    if(userId)filter.owner = userId;
    if(query)filter.title = {$regex:query,$options:"i"};
    if(category)filter.category = category;

    const skip = (page -1)*10
    //TODO: get all videos based on query, sort, pagination
    const allVideos =await Video.find(filter).sort({[sortBy]:sortType === "desc" ? -1:1}).skip(skip).limit(parseInt(limit));

    return res
    .status(200)
    .json(new ApiResponse(200,allVideos," fetched all videos successfully"));

})

const publishAVideo = asyncHandler(async (req, res) => {
    const user =req.user;
    const { title, description} = req.body
    const {videoFile,thumbnail}=req.files;
    // TODO: get video, upload to cloudinary, create video
    const uploadThumbnail = await uploadOnCloudinary(thumbnail?.path);
    const uploadVideo = await uploadOnCloudinary(videoFile?.path);

    const publishedVideo=await Video.create({
        videoFile:uploadVideo.path,
        thumbnail:uploadThumbnail.path,
        title:title,
        description:description,
        owner:user?._id,
        duration:12,
        category:null,
    });


    return res
    .status(200)
    .json(new ApiResponse(200,publishAVideo,"  published video successfully"));

})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
    const video = await Video.findById(videoId);

    return res
    .status(200)
    .json(new ApiResponse(200,video,"fetched video successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
    const user =req.user;
    const { videoId } = req.params;
    const { title, description} = req.body
    const thumbnail=req.file;
    //TODO: update video details like title, description, thumbnail

    const oldVideo=await Video.findById(videoId);

    const oldThumbnail=oldVideo.thumbnail;

    const uploadThumbnail=await uploadOnCloudinary(thumbnail);

    const updateVideo=await Video.findByIdAndUpdate(videoId,{
        $set:{
            title: title,
            description: description,
            thumbnail: uploadThumbnail.url,
        }
    },{new:true, runValidators:true})





    return res
    .status(200)
    .json(new ApiResponse(200,updateVideo,"updated video successfully"));
})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    //TODO: delete video
    const deleteVideo=await Video.findByIdAndDelete(videoId);

    return res
    .status(200)
    .json(new ApiResponse(200,deleteVideo,"deleted video successfully"));
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    const video=await Video.findByIdAndUpdate(videoId);

    if (!video) {
        return res.status(404).json(new ApiResponse(404, null, "Video not found"));
    }

    const updateVideo=await Video.findByIdAndUpdate(videoId,{$set:{isPublished:!video?.isPublished}},{new:true});

    return res
    .status(200)
    .json(new ApiResponse(200,deleteVideo,"toggled isPublished status successfully"));
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}