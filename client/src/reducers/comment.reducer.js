import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addComment, deleteComment, getVideoComments, updateComment } from "../api/comment.api.js";

// Async thunk actions for comments
export const fetchComments = createAsyncThunk("comments/fetchComments", async (videoId) => {
    const res = await getVideoComments(videoId);
    return res.data;
});

export const addVideoComment = createAsyncThunk("comments/addComment", async (data) => {
    console.log(data);
    const res = await addComment(data);
    return res.data;
});

export const removeVideoComment = createAsyncThunk("comments/deleteComment", async (commentId) => {
    await deleteComment(commentId);
    return commentId;
});

export const editVideoComment = createAsyncThunk("comments/updateComment", async (data) => {
    const res = await updateComment(data);
    return res.data;
});

// Comment slice
const commentSlice = createSlice({ 
    name: "comments",
    initialState: {
        comments: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Comments
            .addCase(fetchComments.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.comments = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // Add Comment
            .addCase(addVideoComment.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.comments.push(action.payload);
            })

            // Delete Comment
            .addCase(removeVideoComment.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.comments = state.comments.filter(comment => comment.id !== action.payload);
            })

            // Update Comment
            .addCase(editVideoComment.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.comments.findIndex(comment => comment.id === action.payload.id);
                if (index !== -1) {
                    state.comments[index] = action.payload;
                }
            });
    }
});

export default commentSlice.reducer;












/**
 * createSlice() → Defines the slice of state for videos.

initialState → Sets default values (items = [], status = "idle", error = null).

fetchVideos (async thunk) → Calls API to fetch videos and stores them in Redux.

extraReducers:

pending → Sets status to "loading".

fulfilled → Updates videos when the API succeeds.

rejected → Stores error if API fails.
*/