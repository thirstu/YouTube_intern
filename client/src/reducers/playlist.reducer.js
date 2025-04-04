import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { 
    createPlaylist,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    getPlaylistById,
    getUserPlaylists,
    updatePlaylist 
} from "../api/playlist.api.js";

//// Async thunk actions for playlist management

export const createUserPlaylist = createAsyncThunk("playlist/createPlaylist", async () => {
    const res = await createPlaylist();
    return res.data;
});

export const addVideoToPlay = createAsyncThunk("playlist/addVideoToPlaylist", async () => {
    const res = await addVideoToPlaylist();
    return res.data;
});

export const removeVideoFromPlay = createAsyncThunk("playlist/removeVideoFromPlaylist", async () => {
    const res = await removeVideoFromPlaylist();
    return res.data;
});

export const deletePlay = createAsyncThunk("playlist/deletePlaylist", async () => {
    const res = await deletePlaylist();
    return res.data;
});

export const getPlayById = createAsyncThunk("playlist/getPlaylistById", async () => {
    const res = await getPlaylistById();
    return res.data;
});

export const getUserPlays = createAsyncThunk("playlist/getUserPlaylists", async () => {
    const res = await getUserPlaylists();
    console.log("getUserPlays",res);
    return res.data;
});

export const updatePlay = createAsyncThunk("playlist/updatePlaylist", async () => {
    const res = await updatePlaylist();
    return res.data;
});

const playlistSlice = createSlice({ 
    name: "playlist",
    initialState: {
        playlists: [],
        selectedPlaylist: null,
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUserPlaylist.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createUserPlaylist.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.playlists.push(action.payload);
            })
            .addCase(createUserPlaylist.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addVideoToPlay.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(removeVideoFromPlay.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(deletePlay.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.playlists = state.playlists.filter(p => p.id !== action.payload.id);
            })
            .addCase(getPlayById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.selectedPlaylist = action.payload;
            })
            .addCase(getUserPlays.fulfilled, (state, action) => {
                console.log(state.payload);
                state.status = "succeeded";
                state.playlists = action.payload;
            })
            .addCase(updatePlay.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.selectedPlaylist = action.payload;
            });
    }
});

export default playlistSlice.reducer;












/**
 * createSlice() → Defines the slice of state for videos.

initialState → Sets default values (items = [], status = "idle", error = null).

fetchVideos (async thunk) → Calls API to fetch videos and stores them in Redux.

extraReducers:

pending → Sets status to "loading".

fulfilled → Updates videos when the API succeeds.

rejected → Stores error if API fails.
*/