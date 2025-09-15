import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {registerUser,getWatchHistory,loginUser,refreshAccessToken,changeCurrentPassword,getCurrentUser,getUserChannelProfile,updateAccountDetails,updateUserAvatar,logoutUser} from "../api/user.api.js"
import Cookies from "js-cookie"








// 🟢 Load token from localStorage on app start
const storedUser = JSON.parse(localStorage.getItem("user")) || null;
const storedToken = null;



//// Async thunk to fetch videos from API
export const register=createAsyncThunk("user/registerUser",async (formData,{rejectWithValue })=>{
 try {
       const res=await registerUser(formData,);
   console.log("res",res,"-----",res.data?.success===true);
    //    if (res.data?.success===true) {
    //     return rejectWithValue(data); // Return error message from backend
    // }
   
       console.log(res);
    // localStorage.setItem("token", res.data?.data?.token);

       return res.data//// Returns user data
 } catch (err) {
    return  rejectWithValue(err.response?.data || err.message);
 }

});
export const watchHistory=createAsyncThunk("user/getWatchHistory",async ()=>{
    const res=await getWatchHistory();
    console.log(res);
    return res.data;//// Returns video data

});
export const login=createAsyncThunk("user/loginUser",async (formData,{ rejectWithValue })=>{
   try {
    
     const res=await loginUser(formData);
     console.log(res);
     if (!res.statusText==="ok") {
        return rejectWithValue(res); // Return error message from backend
    }
     // Save user
    // localStorage.setItem("token", data.data.token);  // Save token
     return res.data;//// Returns video data
   } catch (err) {
    console.log(err);
    return rejectWithValue(err.response?.data || err.message);
   }

});
export const logout=createAsyncThunk("user/logoutUser",async ()=>{
    const res=await logoutUser();
    console.log(res);
    localStorage.removeItem("user");
    return res.data;//// Returns video data

});
export const refreshAccess=createAsyncThunk("user/refreshAccessToken",async ()=>{
   try {
     const res=await refreshAccessToken();
     console.log(res);
     return res.data;//// Returns video data
   } catch (err) {
    console.log(err);

    return rejectWithValue(err.response?.data || err.message);
   }

});
export const changePassword=createAsyncThunk("user/changeCurrentPassword",async ()=>{
    const res=await changeCurrentPassword();
    console.log(res);
    return res.data;//// Returns video data

});
export const currentUser=createAsyncThunk("user/getCurrentUser",async ()=>{
    const res=await getCurrentUser();
    console.log(res);
    return res.data;//// Returns video data

});
export const userChannelProfile=createAsyncThunk("user/getUserChannelProfile",async ()=>{
    const res=await getUserChannelProfile();
    console.log(res);
    return res.data;//// Returns video data

});
export const updateAccount=createAsyncThunk("user/updateAccountDetails",async ()=>{
    const res=await updateAccountDetails();
    console.log(res);
    return res.data;//// Returns video data

});
export const updateAvatar=createAsyncThunk("user/updateUserAvatar",async ()=>{
    const res=await updateUserAvatar();
    console.log(res);
    return res.data;//// Returns video data

});


console.log("hell");
// console.log(allVideos());

const userSlice=createSlice({
    name:"user",
    initialState:{
        user:storedUser,//// Stores videos// "idle" | "loading" | "succeeded" | "failed"
        status:"idle",//
        error:null,
        watchHistory: [],
        isAuthenticated: !!storedToken,
        accessToken: storedToken,
    },

    reducers:{
        resetErrorReducer: (state) => {
            state.error = null;
        },
        setAccessTokenReducer:(state,action)=>{
            state.accessToken = action.payload;
        },
        setUserReducer:(state,action)=>{
            state.user = action.payload;
        }

    }, // Normal synchronous reducers (if needed)

    extraReducers:(builder)=>{
        builder
        .addCase(register.pending,(state)=>{
            console.log(state);
            state.status="loading";
        })
        .addCase(register.fulfilled,(state,action)=>{
            console.log(state,action);
            state.status="succeeded";
            state.isAuthenticated = true;
            state.user=action.payload;
            state.token = action.payload.token;


        })
        .addCase(register.rejected,(state,action)=>{
            console.log(state,action);
            state.status="failed";
            state.error=action.payload?.message||"Registration failed";
        })
        .addCase(watchHistory.fulfilled,(state,action)=>{
            state.status="succeeded";
            state.user=action.payload;


        })
        .addCase(login.pending,(state)=>{
            state.status="loading";
        })
        .addCase(login.fulfilled,(state,action)=>{
            console.log(action.payload);
            state.status="succeeded";
            state.user=action.payload.data.user;
            state.accessToken = action.payload.data.accessToken;
            state.isAuthenticated = true;
            localStorage.setItem("user", JSON.stringify(action.payload.data.user));  // Save user
            // localStorage.setItem("token", res.data.token); 


        })
        .addCase(login.rejected,(state,action)=>{
            console.log(state,action);
            state.status="failed";
            state.error=action.payload?.message||"Registration failed";
        })
        .addCase(logout.fulfilled,(state,action)=>{
            console.log(action.payload);
            state.status="succeeded";
            state.user=null;
            state.accessToken = null;
            state.isAuthenticated = false;


        })
        .addCase(refreshAccess.fulfilled,(state,action)=>{
            console.log(action.payload);
            state.status="succeeded";
            // state.user=action.payload;
            state.accessToken = action.payload.accessToken;


        })
        .addCase(changePassword.fulfilled,(state,action)=>{
            state.status="succeeded";
            state.user=action.payload;


        })
        .addCase(currentUser.fulfilled,(state,action)=>{
            state.status="succeeded";
            state.user=action.payload;


        })
        .addCase(userChannelProfile.fulfilled,(state,action)=>{
            state.status="succeeded";
            state.user=action.payload;


        })
        .addCase(updateAccount.fulfilled,(state,action)=>{
            state.status="succeeded";
            state.user=action.payload;


        })
        .addCase(updateAvatar.fulfilled,(state,action)=>{
            state.status="succeeded";
            state.user=action.payload;


        })

    }


})
export const { resetErrorReducer,setAccessTokenReducer,setUserReducer } = userSlice.actions;
export default userSlice.reducer;












/**
 * createSlice() → Defines the slice of state for videos.

initialState → Sets default values (user = [], status = "idle", error = null).

fetchVideos (async thunk) → Calls API to fetch videos and stores them in Redux.

extraReducers:

pending → Sets status to "loading".

fulfilled → Updates videos when the API succeeds.

rejected → Stores error if API fails.
*/