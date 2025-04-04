import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {getAllVideos,publishAVideo,getVideoById,getUsersAllVideos,togglePublishStatus,updateVideo,deleteVideo} from "../api/video.api.js"






//// Async thunk to fetch videos from API
export const allVideos=createAsyncThunk("videos/allVideos",async ()=>{
    const res=await getAllVideos();
    console.log(res);
    return res.data;//// Returns video data

});
export const publish=createAsyncThunk("videos/publishAVideo",async (formData)=>{
    console.log(formData);

    const res=await publishAVideo(formData);
    console.log(res);
    return res.data;//// Returns video data

});
export const videoById=createAsyncThunk("videos/getVideoById",async ()=>{
    const res=await getVideoById();
    console.log(res);
    return res.data;//// Returns video data

});
export const usersAllVideos=createAsyncThunk("videos/getUsersAllVideos",async ()=>{
    const res=await getUsersAllVideos();
    console.log(res);
    return res.data;//// Returns video data

});
export const toggleStatus=createAsyncThunk("videos/togglePublishStatus",async ()=>{
    const res=await togglePublishStatus();
    console.log(res);
    return res.data;//// Returns video data

});
export const updateVideoTo=createAsyncThunk("videos/updateVideo",async (data)=>{
    console.log("updateVideoTo=createAsyncThunk---",data);
    const res=await updateVideo(data);
    console.log(res);
    return res.data;//// Returns video data

});
export const deleteVid=createAsyncThunk("videos/deleteVideo",async (videoId)=>{
    const res=await deleteVideo(videoId);
    console.log(res);
    return res.data;//// Returns video data

});
console.log("hell");
// console.log(allVideos());

const videoSlice=createSlice({
    name:"videos",
    initialState:{
       
        selectedVideo: null,
        allChannelsVideos:[],
        upload:null,
        channelVideos:[],
        status:"idle",//
        error:null,

        publishStatus: "idle", // Tracks status of publishing a video
        toggleStatus: "idle", // Tracks status of toggling publish status
        updateStatus: "idle", // Tracks status of updating a video
        deleteStatus: "idle", // Tracks status of deleting a video
    },

    reducers:{}, // Normal synchronous reducers (if needed)

    extraReducers:(builder)=>{
        builder
        .addCase(allVideos.pending,(state)=>{
            state.status="loading";
        })
        .addCase(allVideos.fulfilled,(state,action)=>{
            state.status="succeeded";
            state.allChannelsVideos=action.payload;


        })
        .addCase(allVideos.rejected,(state,action)=>{
            state.status="failed";
            state.allChannelsVideos=action.error.message;
        })
        .addCase(publish.fulfilled,(state,action)=>{
            console.log(action.payload);
            state.publishStatus="succeeded";
            state.upload=action.payload;


        })
        .addCase(videoById.fulfilled,(state,action)=>{
            state.status="succeeded";
            state.selectedVideo=action.payload;


        })
        .addCase(usersAllVideos.fulfilled,(state,action)=>{
            console.log(usersAllVideos);
            state.status="succeeded";
            state.channelVideos=action.payload;


        })
        .addCase(toggleStatus.fulfilled,(state,action)=>{
            state.toggleStatus="succeeded";
            state.selectedVideo=action.payload;


        })
        .addCase(updateVideoTo.fulfilled,(state,action)=>{
            console.log("updateVideoTo",action.payload);
            state.updateStatus="succeeded";
            state.selectedVideo=action.payload;


        })
        .addCase(deleteVid.fulfilled,(state,action)=>{
            state.deleteStatus="succeeded";
            state.selectedVideo=action.payload;


        })
        

    }


})

export default videoSlice.reducer;












/**
 * createSlice() → Defines the slice of state for videos.

initialState → Sets default values (items = [], status = "idle", error = null).

fetchVideos (async thunk) → Calls API to fetch videos and stores them in Redux.

extraReducers:

pending → Sets status to "loading".

fulfilled → Updates videos when the API succeeds.

rejected → Stores error if API fails.
*/