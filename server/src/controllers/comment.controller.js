import mongoose from "mongoose"
// import { Comment } from "../models/comment.models.js"
// import { ApiError } from "../utils/apiError.js"
// import { ApiResponse } from "../utils/apiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/apiResponse.js";
import { Comment } from "../models/comment.models.js";

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const {videoId} = req.params

    const user=req.user;
    const {content}=req.body;

    console.log(videoId, content,user);

    const comment=await  Comment.create({
        content:content,
        owner:user?._id,
        video:videoId,
        


    })


    console.log(req.body, req.query, req.params ,req.file);
    return res
    .status(200)
    .json(new ApiResponse(200,{comment},"comments added successfully"))

})

const getVideoComments = asyncHandler(async (req, res) => {

    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query;
    const skip=(page-1)*limit
    const owner=req.user;

    // console.log(videoId,page,skip,owner);
    const videoComments=await Comment.find({video:videoId}).limit(limit).skip(skip);

    if(!videoComments)return ;
    console.log(req.body, req.query, req.params ,req.file);


    return res
    .status(200)
    .json(new ApiResponse(200,{videoComments},"comments are here"))
})



const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const {commentId} = req.params

    const user=req.user;
    const {content}=req.body;

    const comment=await Comment.findByIdAndUpdate(commentId,{
        content:content,
        
    },{new:true,})

    return res
    .status(200)
    .json(new ApiResponse(200,{comment},"comment updated successfully"))
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const {commentId} = req.params


    console.log(commentId);
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