// src/reducers/subscription.reducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  toggleSubscription as toggleAPI,
  getSubscribedChannels as getSubscribedAPI,
  getUserChannelSubscribers as getSubscribersAPI,
  getChannelSubscribersCount as getSubscribersCountAPI,
} from "../api/subscription.api";

// --- Async Thunks ---
export const toggleSubscription = createAsyncThunk(
  "subscription/toggle",
  async (channelId, { rejectWithValue }) => {
    try {
      return await toggleAPI(channelId);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getSubscribedChannels = createAsyncThunk(
  "subscription/getSubscribedChannels",
  async (subscriberId, { rejectWithValue }) => {
    try {
      return await getSubscribedAPI(subscriberId);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getUserChannelSubscribers = createAsyncThunk(
  "subscription/getUserChannelSubscribers",
  async (channelId, { rejectWithValue }) => {
    try {
      return await getSubscribersAPI(channelId);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getChannelSubscribersCount = createAsyncThunk(
  "subscription/getChannelSubscribersCount",
  async (channelId, { rejectWithValue }) => {
    try {
      console.log(channelId);
      return await getSubscribersCountAPI(channelId);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// --- Slice ---
// --- Slice ---
const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    subscribedChannels: [],   // list of channels user subscribed to
    channelSubscribers: [],   // list of users subscribed to a channel
    subscriberCount: 0,       // number of subscribers for a channel
    isSubscribed: false,      // 👈 add this to track if current user is subscribed
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // toggleSubscription
      .addCase(toggleSubscription.pending, (state) => {
        state.status = "loading";
      })
      .addCase(toggleSubscription.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { data, message } = action.payload;

        if (message.includes("added")) {
          state.subscribedChannels.push(data);
          state.subscriberCount += 1; // increment count
          state.isSubscribed = true; // 👈 update subscription state
        } else if (message.includes("removed")) {
          state.subscribedChannels = state.subscribedChannels.filter(
            (sub) => sub.channel !== data.channel
          );
          state.subscriberCount = Math.max(0, state.subscriberCount - 1);
          state.isSubscribed = false; // 👈 update subscription state
        }
      })
      .addCase(toggleSubscription.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // getSubscribedChannels
      .addCase(getSubscribedChannels.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSubscribedChannels.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subscribedChannels = action.payload.data || [];
      })
      .addCase(getSubscribedChannels.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // getUserChannelSubscribers
      .addCase(getUserChannelSubscribers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserChannelSubscribers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.channelSubscribers = action.payload.data || [];
      })
      .addCase(getUserChannelSubscribers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // getChannelSubscribersCount
      .addCase(getChannelSubscribersCount.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getChannelSubscribersCount.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subscriberCount = action.payload.data?.count || 0;
        state.isSubscribed = action.payload.data?.isSubscribed || false; // 👈 store subscription state
      })
      .addCase(getChannelSubscribersCount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});


export default subscriptionSlice.reducer;
