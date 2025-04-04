import { API } from "./user.api.js";

const createTweet=async()=>await API.post("/tweet/create");
const getUserTweets=async()=>await API.get("/tweet/get");
const updateTweet=async()=>await API.post("/tweet/update/:tweetId");
const deleteTweet=async()=>await API.get("/tweet/delete/:tweetId");






export {}
