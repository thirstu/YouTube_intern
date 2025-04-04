import axios from "axios";
import Cookies from "js-cookie"
import store from "../store/store.js"

const API=axios.create({baseURL:`http://localhost:3000/api/v1`});

API.interceptors.request.use((req)=>{
    const state=store.getState();
    
    const accessToken = state.user?.accessToken; // Extract token from userSlice
    console.log("accessToken: " , accessToken);

        if (accessToken) {
            console.log("if ---accessToken: " , accessToken);

           req.headers.Authorization = `Bearer ${accessToken}`;
        }
        return req;
    
    
    
} ,(error) => Promise.reject(error))

const registerUser=async(formData)=>{
   
     const res=await API.post("/users/register",formData, { 
         headers:{"Content-Type":"multipart/form-data"},
     })
     console.log(res.data);
     return res;
   
};
const loginUser=async(formData)=>{
    const res=await API.post("/users/login",formData,{
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // For cookies/session if needed
    })
    console.log(res.data);
     return res;
};
const logoutUser=async()=>{
    const res=await API.get("/users/logout"
      
    );

    console.log(res);
    return res;
}
const refreshAccessToken=async()=>{
    try {
        const response = await API.post(
          "users/refresh-token",
          {},
          { withCredentials: true } // Automatically includes cookies
        );
        console.log("New token:", response);
        return response.data;
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
}
const changeCurrentPassword=async()=>await API.get("/users/change-password");
const getCurrentUser=async()=>await API.post("/users/current-user");
const updateAccountDetails=async()=>await API.get("/users/update-account");
const updateUserAvatar=async()=>await API.get("/users/update-avatar");
const getUserChannelProfile=async()=>await API.get("/users/c/:userName");
const getWatchHistory=async()=>await API.get("/users/watch-history");









export {API,registerUser,getWatchHistory,loginUser,logoutUser,refreshAccessToken,changeCurrentPassword,getCurrentUser,getUserChannelProfile,updateAccountDetails,updateUserAvatar}