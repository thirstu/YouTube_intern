import mongoose from "mongoose"
// import { Comment } from "../models/comment.models.js"
// import { ApiError } from "../utils/apiError.js"
// import { ApiResponse } from "../utils/apiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/apiResponse.js";
import { Comment } from "../models/comment.models.js";

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query;
    const skip=(page-1)*limit
    const owner=req.user;

    const videoComments=await Comment.find(videoId).limit(limit);

    if(!videoComments)return ;
    console.log(req.body, req.query, req.params ,req.file);


    return res
    .status(200)
    .json(new ApiResponse(200,{videoComments},"comments are here"))
})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const {videoId} = req.params

    const user=req.user;
    const videoComment=req.body;

    const comment=await  Comment.create({
        content:videoComment,
        owner:user,
        video:videoId,
        


    })


    console.log(req.body, req.query, req.params ,req.file);
    return res
    .status(200)
    .json(new ApiResponse(200,{videoComments},"comments added successfully"))

})


const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const {commentId} = req.params

    const user=req.user;
    const videoComment=req.body;

    const comment=await Comment.findByIdAndUpdate(commentId,{
        content:videoComment,
        
    },{new:true,})

    return res
    .status(200)
    .json(new ApiResponse(200,{videoComments},"comment updated successfully"))
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const {commentId} = req.params


    const commentDeleted=await Comment.findByIdAndDelete(commentId)
    
    return res
    .status(200)
    .json(new ApiResponse(200,{commentDeleted},"comment deleted"))
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }