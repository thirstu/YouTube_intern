import { API } from "./user.api.js";

const addComment=async({comment,videoId})=>{
    console.log("addComment------",videoId);
    const res=await API.post(`/comment/add-comments/${videoId}`,{content:comment},{headers: { "Content-Type": "application/json" }});
    console.log(res);
    return res.data;
}
const getVideoComments=async()=>{
    const res=await API.get(`/comment/comments/${videoId}`);
    return res.data;
}
const updateComment=async()=>{
    const res=await API.post(`/comment/update-comments/${commentId}`,{comment},{headers: { "Content-Type": "application/json" }});

    return res.data;
}
const deleteComment=async()=>{
    const res=await API.get(`/comment/delete-comments/${commentId}`);
    return res.data;
}


export {addComment,deleteComment,getVideoComments,updateComment}
const updateVideo=async({formData,videoId})=>{
    console.log("updateVideo------",videoId);
    const res=await API.post(`/video/update/${videoId}`,formData,{
        headers:{"Content-Type":"multipart/form-data"}
    });
    console.log(res);
    return res.data;
}