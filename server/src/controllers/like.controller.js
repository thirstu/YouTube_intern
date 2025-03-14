import mongoose, {isValidObjectId} from "mongoose"
// import {Like} from "../models/like.model.js"
// import { ApiError } from "../utils/apiError.js"
// import { ApiResponse } from "../utils/apiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {Like} from '../models/like.models.js';
import { ApiResponse } from "../utils/apiResponse.js";
import { Comment } from "../models/comment.models.js";


const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params;
    const user=req.user;
    //TODO: toggle like on video
    const likeExist=await Like.findOne({video:videoId,likedBy:user});

    if(likeExist){
        const deletedLike=await Like.findByIdAndDelete(likeExist._id);
        return res
        .status(200)
        .json(new ApiResponse(200,deletedLike,"unliked video successfully"))
    }else{
        const createdLike=await Like.create({video:videoId,likedBy:user});
        return res
        .status(200)
        .json(new ApiResponse(200,createdLike," liked video successfully"))
    }
    


})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    const user=req.user;
    //TODO: toggle like on comment
    const likeExist=await Comment.findOne({comment:commentId,likedBy:user});

    if(likeExist){
        const deletedLike=await Comment.findByIdAndDelete(likeExist._id);

        return res
        .status(200)
        .json(new ApiResponse(200,deletedLike,"unliked comment successfully"))
    }else{
        const createdLike=await Comment.create({comment:commentId,likedBy:user});

        return res
        .status(200)
        .json(new ApiResponse(200,createdLike," liked comment successfully"))
    }

})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    const user=req.user;

    //TODO: toggle like on tweet
    const likeExist=await Like.findOne({tweet:tweetId,likedBy:user});

    if(likeExist){
        const deletedLike=await Like.findByIdAndDelete(likeExist._id);
        return res
        .status(200)
        .json(new ApiResponse(200,deletedLike,"unliked tweet successfully"))
    }else{
        const createdLike=await Like.create({tweet:tweetId,likedBy:user});
        return res
        .status(200)
        .json(new ApiResponse(200,createdLike," liked tweet successfully"))
    }
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    const user=req.user;
    //TODO: get all liked videos
    const likedVideos = await Like.find(user._id);


    return res
    .status(200)
    .json(new ApiResponse(200,likedVideos,"all  liked videos "))
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}