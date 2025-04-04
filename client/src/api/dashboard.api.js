import { API } from "./user.api.js";

const getChannelStats=async()=>await API.get("/dashboard/stats/:channelId");
const getChannelVideos=async()=>await API.get("/dashboard/videos/:channelId");


export {}
