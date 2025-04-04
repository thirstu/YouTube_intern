import { API } from "./user.api.js";

const downloadVideo=async()=>await API.get("/premium/download");
const updateUserPlan=async()=>await API.get("/premium/updatePlan");


export {}
