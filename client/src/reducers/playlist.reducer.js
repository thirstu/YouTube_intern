import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { 
    createPlaylist,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    getPlaylistById,
    getUserPlaylists,
    updatePlaylist,
    togglePlaylist
     
} from "../api/playlist.api.js";

//// Async thunk actions for playlist management

export const createUserPlaylist = createAsyncThunk("playlist/createPlaylist", async (data) => {
    console.log(data);
    const res = await createPlaylist(data);
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

export const deletePlay = createAsyncThunk("playlist/deletePlaylist", async ({playlistId}) => {
    console.log(playlistId);
    const res = await deletePlaylist({playlistId});
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

export const updatePlay = createAsyncThunk("playlist/updatePlaylist", async ({ playlistId,
       
        name}) => {
    const res = await updatePlaylist({ playlistId,
       
        name});
    return res.data;
});
export const toggleUserPlaylist = createAsyncThunk(
  "playlist/togglePlaylist",
  async (data, { rejectWithValue }) => {
    try {
        console.log(data);
      const res = await togglePlaylist(data);
      console.log(res);
      return res.data; // contains updatedPlaylist + playlistsWithSelected
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

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
                state.playlists.push(action.payload.data);
            })
            .addCase(createUserPlaylist.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addVideoToPlay.fulfilled, (state) => {
                state.status = "succeeded";
            })
            .addCase(removeVideoFromPlay.fulfilled, (state) => {
                state.status = "succeeded";
            })
            .addCase(deletePlay.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.playlists = state.playlists.filter(
                  (p) => p._id !== action.payload.id
                );
            })
            .addCase(getPlayById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.selectedPlaylist = action.payload;
            })
            .addCase(getUserPlays.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.playlists = action.payload.data;
            })
            .addCase(updatePlay.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.selectedPlaylist = action.payload;
            })
            // ✅ new toggle handler
            .addCase(toggleUserPlaylist.pending, (state) => {
                state.status = "loading";
            })
            .addCase(toggleUserPlaylist.fulfilled, (state, action) => {
                state.status = "succeeded";
                console.log(state,action.payload);
                // overwrite playlists with latest (with selected flag)
                state.playlists = action.payload.data.playlists;
                // update selected playlist if it matches
                const updated = action.payload.data?.updatedPlaylist;
                if (state.selectedPlaylist?._id === updated?._id) {
                  state.selectedPlaylist = updated;
                }
            })
            .addCase(toggleUserPlaylist.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
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