import mongoose, { isValidObjectId } from "mongoose"
// import {Tweet} from "../models/tweet.model.js"
// import {User} from "../models/user.model.js"
// import { ApiError } from "../utils/apiError.js"
// import { ApiResponse } from "../utils/apiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Tweet } from "../models/tweet.models.js";

const createTweet = asyncHandler(async (req, res) => {
    const user = req.user;
    const tweet = req.body;
    //TODO: create tweet

    const newTweet = await Tweet.create({
        owner: user._id,
        content:tweet,
    })

    return res
    .status(200)
    .json(new ApiResponse(200,newTweet," created tweet successfully"));

})

const getUserTweets = asyncHandler(async (req, res) => {
    const user = req.user;
    // TODO: get user tweets
    const tweets = await Tweet.find(user._id);

    return res
    .status(200)
    .json(new ApiResponse(200,tweets," fetched tweets successfully"));
})

const updateTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params; 
    const user = req.user;
    const updateData = req.body;
    //TODO: update tweet
    const tweetUpdate = await Tweet.findByIdAndUpdate({owner:user._id,_id:tweetId},{$set: {content:updateData}},{new:true});

    if (!tweetUpdate) {
        return res.status(404).json(new ApiResponse(404, null, "Tweet not found "));
    }

    return res
    .status(200)
    .json(new ApiResponse(200,tweetUpdate," updated tweet successfully"));

})

const deleteTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params; 

    const user = req.user;
    //TODO: delete tweet
    const tweetDelete = await Tweet.findByIdAndDelete({owner:user._id,_id:tweetId});

    if (!tweetDelete) {
        return res.status(404).json(new ApiResponse(404, null, "Tweet not found "));
    }

    return res
    .status(200)
    .json(new ApiResponse(200,tweetDelete," deleted tweet successfully"));
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}