// src/api/subscription.api.js
import { API } from "./user.api.js"; // <-- your axios instance with baseURL & headers

// Toggle subscription for a channel (subscribe/unsubscribe)
 const toggleSubscription = async (channelId) => {
        console.log(channelId);

  const res = await API.get(`/subscription/toggle/${channelId}`);
  return res.data;
};

// Get all channels subscribed by a user
 const getSubscribedChannels = async (subscriberId) => {
  const res = await API.get(`/subscription/channels/${subscriberId}`);
  return res.data;
};

// Get all subscribers of a channel
 const getUserChannelSubscribers = async (channelId) => {
  const res = await API.get(`/subscription/subscribers/${channelId}`);
  return res.data;
};
// Get all subscribers count of a channel "/subscribers/count/:channelId"
 const getChannelSubscribersCount = async ({channelId}) => {
  console.log(channelId);
  const res = await API.get(`/subscription/subscribers/count/${channelId}`);
  console.log(res.data);
  return res.data;
};


export {toggleSubscription,getSubscribedChannels,getUserChannelSubscribers,getChannelSubscribersCount}
