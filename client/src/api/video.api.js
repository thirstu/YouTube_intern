
import { API } from "./user.api.js";

const getAllVideos=async()=>await API.get("/video/all-videos");
const publishAVideo=async(formData)=>{
    const res =await API.post("/video/upload",formData,{
        headers:{"Content-Type":"multipart/form-data"}
    });
    console.log(res);
    return res;

}
const getVideoById=async()=>await API.get("/video/video/:videoId");
const getUsersAllVideos=async()=>{
    const res=await API.get("/video/all-users-videos?");
    console.log(res);
    return res;
};
const togglePublishStatus=async()=>await API.get("/video/toggle/:videoId");
const updateVideo=async({formData,videoId})=>{
    console.log("updateVideo------",videoId);
    const res=await API.post(`/video/update/${videoId}`,formData,{
        headers:{"Content-Type":"multipart/form-data"}
    });
    console.log(res);
    return res.data;
}
const deleteVideo=async(videoId)=>{
    const red=await API.get(
        `/video/delete/${videoId}`
    );
}




// const getAllVideos=async()=>{
//     const data=await API.get("/video/all-videos")
//     console.log(data);
//     return data
// };
// console.log(getAllVideos());




export {getAllVideos,publishAVideo,getVideoById,getUsersAllVideos,togglePublishStatus,updateVideo,deleteVideo}