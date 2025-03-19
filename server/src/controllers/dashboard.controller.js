import mongoose from "mongoose"
// import {Video} from "../models/video.models.js"
// import {Subscription} from "../models/subscription.model.js"
// import {Like} from "../models/like.model.js"
// import { ApiError } from "../utils/apiError.js"
// import { ApiResponse } from "../utils/apiResponse.js"
import {Video} from '../models/video.models.js';

import {asyncHandler} from "../utils/asyncHandler.js"
import { Subscription } from "../models/subscription.models.js";
import { Like } from "../models/like.models.js";
import { ApiResponse } from "../utils/apiResponse.js";

const getChannelStats = asyncHandler(async (req, res) => {
    console.log("hello");
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
    const {channelId}=req.params;

    const channelVideos=await Video.countDocuments({owner:channelId});

    console.log("channelVideos",channelVideos);

    const channelSubscribers=await Subscription.countDocuments({channel:channelId});

    console.log("channelSubscribers",channelSubscribers);


    const totalViews=await Video.aggregate([
        {$match:{owner:channelId}},
        {$group:{_id:null,totalViews:{$sum:"$views"}}}
    ]);

    console.log("totalViews",totalViews);


    const videoLikes=await Like.countDocuments({video:{$in:await Video.find({owner:channelId}).distinct("_id")}});
    console.log("videoLikes",videoLikes);


    const stats={
        channelVideos,
        channelSubscribers,
        totalViews:totalViews.length>0?totalViews:0,
        videoLikes,

    }

    return res
    .status(200)
    .json(new ApiResponse(200,stats,"channel stats"))
})

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
    const {channelId} = req.params;
    console.log("hello",channelId);

    const videos=await Video.find({owner:channelId});

    console.log("videos",videos);

    return res
    .status(200)
    .json(new ApiResponse(200,videos,"channel videos"))
    
})

export {
    getChannelStats, 
    getChannelVideos
    }