import mongoose from "mongoose"
// import {Video} from "../models/video.models.js"
// import {Subscription} from "../models/subscription.model.js"
// import {Like} from "../models/like.model.js"
// import { ApiError } from "../utils/apiError.js"
// import { ApiResponse } from "../utils/apiResponse.js"
import {Video} from '../models/video.models.js';

import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
})

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
    const {channelId} = req.params;

    const videos=await Video.find(channelId);

    
})

export {
    getChannelStats, 
    getChannelVideos
    }