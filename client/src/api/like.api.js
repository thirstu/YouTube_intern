import { API } from "./user.api.js";

const toggleCommentLike=async()=>await API.get("/like/toggle-comment-like/:commentId");
const toggleTweetLike=async()=>await API.get("/like/toggle-tweet-like/:tweetId");
const toggleVideoLike=async()=>await API.get("/like/toggle-video-like/:videoId");
const getLikedVideos=async()=>await API.get("/like/liked-videos/:userId");


export {toggleCommentLike,toggleTweetLike,toggleVideoLike,getLikedVideos}
