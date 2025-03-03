import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import {User} from "../models/user.models.js"
// import { upload } from "../middleware/multer.middleware.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from 'jsonwebtoken'
import { env_file } from "../index_env.js";


const generateAccessAndRefreshTokens =async (userId)=>{
    try {
        const user=await User.findById(userId);
        const accessToken =await user.generateAccessToken();
        const refreshToken =await user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave:false});

        console.log("---17---accessToken--refreshToken",accessToken,refreshToken);
        return {accessToken,refreshToken}
    } catch (err) {
        console.error("generateAccessAndRefreshTokens----13---",err);
        throw new ApiError(500,"something went wrong while generating access and refresh tokens")
    }

}





const registerUser=asyncHandler(async (req,res,next)=>{
    // console.log('9--req.body---',req.body);
    // console.log('10--req.files---',req.files);


    ////get user details from frontend
    const {email,userName,password}=req.body;
    // console.log(email,userName,password);

    ////validation - not empty
    if([userName,password,email].some((field)=>field?.trim()==="")){
        throw new ApiError(400,"----registerUser---all fields are required")

    }

    ////check if user already exists: userName or email
    const existingUser=await User.findOne({
        email
        // $or:[{userName},{email}]
    })
    // console.log("----25----",existingUser);
    
    if(existingUser){
        throw new ApiError(409,"28----registerUser---user already exists")
    }



    let avatarLocalPath;
    if(req.files&&Array.isArray(req.files.avatar)&&req.files.avatar.length>0){
        avatarLocalPath=req.files?.avatar[0]?.path 

    }else{
        throw new ApiError(400,"----registerUser---avatar file are required")
    }
    // console.log("----32----",avatarLocalPath,);

    
    

    ////upload them to cloudinary, avatar 
    const avatar=await uploadOnCloudinary(avatarLocalPath);
    // console.log('---43---',avatar);

    ////check for images, check for avatar
    if(!avatar){
        throw new ApiError(400,"44----registerUser---avatar file are required")
    }

    ////create user object - create entry in db
    const user=await User.create(
        {
            userName:userName.toLowerCase(),
            avatar:avatar.url,
            email,
            password
        }
    )
    console.log("----56----",user,);


    /////remove password and refresh token field from response
    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    );

    ////// check for user creation
    if(!createdUser){
        throw new ApiError(500,"-66---registerUser---something went wrong while registering the user")
    }
    ////// return res
    return res.status(201).json(new ApiResponse(200,createdUser,"user registered successfully"))








    // console.log(req);
    // res.status(200).json({
    //     message:"ok ajay",
    // })

})






const loginUser=asyncHandler(async(req,res,next)=>{
    ////taking login details form req body => data
    /////check if user exists userName or email
    /////if user does not exist then response user is not registered please register
    /////if user exist then authenticate user data password
    /////create access token and refresh token 
    ////send cookie

    const {email, password,userName}=req.body;
    console.log("-130--loginUser",req.body,req.files,req.params,req.query);
    // console.log("-131--loginUser",req);
    if(!(email || password)){
        throw new ApiError(400,"userName or email ir required");
    }

    const user=await User.findOne({
        $or:[{email},{userName}]
    })

    if(!user){
        throw new ApiError(404,"User does not exist")
    }

    const isPasswordValid=await user.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new ApiError(401,"password is not correct")
    }

    const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id);

    // console.log("---152---accessToken--refreshToken",accessToken,refreshToken);
    // user.refreshToken=refreshToken
    // user.save();
    ///☝️or👇//saving a refresh token or adding
    const loggedInUser=await User.findById(user._id).select("-password -refreshToken")

    const options={
        httpOnly: true,
        secure:true,
    }

    return res.
    status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedInUser,
                accessToken,
                refreshToken
            },
            "user logged in successfully"
        )
    )


})


const logoutUser=asyncHandler(async (req, res) => {
    try {
        await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken: undefined,
            },
        },
        {
            new: true,
        }
        )

        const options={
            httpOnly: true,
            secure:true,
        }

        return res
        .status(200)
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json(new ApiResponse(200,{},"user logged out successfully"))



    } catch (err) {
        console.error(err);
        
    }
})




const refreshAccessToken =asyncHandler(async (req, res) => {
  try {
      const incomingRefreshToken =await req.cookies.refreshToken||req.body.refreshToken;
  
      if(!incomingRefreshToken){
          throw new ApiError(401,"unauthorized request");
      }
  
      const decodedToken=jwt.verify(
          incomingRefreshToken,
          env_file.REFRESH_TOKEN_SECRET
      );
  
      const user=await User.findById(decodedToken?._id);
      
  
      if(!user){
          throw new ApiError(401,"invalid refresh token");
      }
  
      if(incomingRefreshToken !== user?.refreshToken){
          throw new ApiError(401,"refresh token is expired or used"); 
      }
  
  
      const options={
          httpOnly: true,
          secure: true,
      }
  
      const {accessToken,newRefreshToken}=await generateAccessAndRefreshTokens(user._id);
  
      return res
      .status(200)
      .cookie("accessToken",accessToken)
      .cookie("accessToken",newRefreshToken)
      .json(
          new ApiResponse(200,{accessToken,refreshToken:newRefreshToken},"access token refreshed ")
      )
  
  } catch (err) {
    console.error("-262--refreshAccessToken",err);
    throw new ApiError(401,err?.message || "Invalid refresh token")
    
  }

})

const changeCurrentPassword =asyncHandler(async (req,res)=>{
    const {oldPassword,newPassword} = req.body;

    const user=await User.findById(req.user?._id);
    const isPasswordCorrect=await user.isPasswordCorrect(oldPassword);

    if(!isPasswordCorrect){
        throw new ApiError(400,"Invalid old password")
    }

    user.password=newPassword;
    await user.save({validateBeforeSave:false});

    return res
    .status(200)
    .json(new ApiResponse(200,{},"Password updated successfully"))
})


const getCurrentUser = asyncHandler(async(req,res)=>{
    return res
    .status(200)
    .json(200,req.user,"current user fetched successfully")
})

const updateAccountDetails= asyncHandler(async(req,res)=>{
    const {fullName, email}=req.body;

    if(!fullName||!email){
        throw new ApiError(400,"All fields are required")
    }

    const user=await User.findByIdAndUpdate(req.user?._id,{
        $set:{
            fullName:fullName,
            email:email
        }

    },
    {new:true}
).select("-password");

return res
.status(200)
.json(new ApiResponse(200,user,"account updated successfully"))

})

const updateUserAvatar=asyncHandler(async (req,res)=>{
    const avatarLocalPath=req.file?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is missing")
    }

    const avatar =await uploadOnCloudinary(avatarLocalPath);

    if(!avatar?.url){
        throw new ApiError(400,"error while uploading avatar")

    }

    const user=await User.findByIdAndUpdate(req.user?._id,
        {
            $set:{
                avatar: avatar.url
            }
        },
        {new:true}
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200,user,"user avatar updated successfully")
    )

})



export { 
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar
}