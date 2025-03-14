import mongoose, {isValidObjectId} from "mongoose"
// import {User} from "../models/user.model.js"
// import { Subscription } from "../models/subscription.model.js"
// import { ApiError } from "../utils/apiError.js"
// import { ApiResponse } from "../utils/apiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {Subscription} from "../models/subscription.models.js"

const toggleSubscription = asyncHandler(async (req, res) => {
    const user = req.user;
    const {channelId} = req.params
    // TODO: toggle subscription
    const subscriberExist=await Subscription.find({subscriber:user._id, channel:channelId});

    if(subscriberExist){
        const subscription=await Subscription.findByIdAndDelete(subscriberExist._id);

        return res
        .status(200)
        .json(new ApiResponse(200,subscription," removed subscription successfully"));
    }else{
        const subscription=await Subscription.create({subscriber:user._id, channel:channelId});

        return res
        .status(200)
        .json(new ApiResponse(200,subscription," added subscription successfully"));
    }



})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params;
    const subscribers=await Subscription.find(channelId);

    return res
    .status(200)
    .json(new ApiResponse(200,subscribers," channel subscribers "));
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params;

    const channels=await Subscription.find(subscriberId);

    return res
    .status(200)
    .json(new ApiResponse(200,channels," subscribed channels "));

})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}