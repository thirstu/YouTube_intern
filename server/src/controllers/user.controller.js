import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import {User} from "../models/user.models.js"
// import { upload } from "../middleware/multer.middleware.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser=asyncHandler(async (req,res,next)=>{


    ////get user details from frontend
    const {email,userName,password}=req.body;
    console.log(email,userName,password);

    ////validation - not empty
    if([userName,password,email].some((field)=>field?.trim()==="")){
        throw new ApiError(400,"----registerUser---all fields are required")

    }

    ////check if user already exists: userName or email
    const existingUser=User.findOne({
        $or:[{userName},{email}]
    })
    console.log(existingUser);
    
    if(existingUser){
        throw new ApiError(409,"----registerUser---user already exists")
    }

    const avatarLocalPath=req.files?.avatar[0]?.path 
    console.log(avatarLocalPath);

    ////check for images, check for avatar
    if(!avatarLocalPath){
        throw new ApiError(400,"----registerUser---avatar file are required")
    }
    

    ////upload them to cloudinary, avatar 
    const avatar=await uploadOnCloudinary(avatarLocalPath);

    if(!avatar){
        throw new ApiError(400,"----registerUser---avatar file are required")
    }

    ////create user object - create entry in db
    const user=await User.create(
        {
            username:userName.toLowerCase(),
            avatar:avatar.url,
            email,
            password
        }
    )
    console.log(user);


    /////remove password and refresh token field from response
    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    );

    ////// check for user creation
    if(!createdUser){
        throw new ApiError(500,"----registerUser---something went wrong while registering the user")
    }
    ////// return res
    return res.status(201).json(new ApiResponse(200,createdUser,"user registered successfully"))








    // console.log(req);
    // res.status(200).json({
    //     message:"ok ajay",
    // })

})

export { registerUser}