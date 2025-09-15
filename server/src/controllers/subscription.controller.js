import mongoose, {isValidObjectId} from "mongoose"
// import {User} from "../models/user.model.js"
// import { Subscription } from "../models/subscription.model.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {Subscription} from "../models/subscription.models.js"

const toggleSubscription = asyncHandler(async (req, res) => {
    console.log("hello");
    const user = req.user;
    const {channelId} = req.params;
    // TODO: toggle subscription
    const subscriberExist=await Subscription.find({subscriber:user._id, channel:channelId});
    console.log("user",subscriberExist,channelId);

    if(subscriberExist.length > 0) {
        const subscription=await Subscription.findOneAndDelete({subscriber:subscriberExist[0].
            subscriber,channel:channelId});

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
    const subscribers=await Subscription.find({channel:channelId});

    return res
    .status(200)
    .json(new ApiResponse(200,subscribers," channel subscribers "));
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params;

    const channels=await Subscription.find({subscriber:subscriberId});

    return res
    .status(200)
    .json(new ApiResponse(200,channels," subscribed channels "));

})
const getChannelSubscriberCount = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  const userId = req.user?._id; // comes from auth middleware

  console.log("getChannelSubscriberCount---channelId", channelId);

  // run both queries in parallel
  const [count, subscription] = await Promise.all([
    Subscription.countDocuments({ channel: channelId }),
    userId ? Subscription.exists({ subscriber: userId, channel: channelId }) : null,
  ]);

  console.log("getChannelSubscriberCount---count", count);

  return res.status(200).json(
    new ApiResponse(
      200,
      { 
        count, 
        isSubscribed: !!subscription // true if user subscribed, false otherwise
      },
      "subscriber count and status"
    )
  );
});



export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels,
    getChannelSubscriberCount
}