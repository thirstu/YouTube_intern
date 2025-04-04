import { API } from "./user.api.js";

const toggleSubscription=async()=>await API.get("/subscription/toggle/:channelId");
const getSubscribedChannels=async()=>await API.get("/subscription/channels/:subscriberId");
const getUserChannelSubscribers=async()=>await API.get("/subscription/subscribers/:channelId");


export {}
