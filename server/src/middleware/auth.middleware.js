import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js'
import  jwt  from 'jsonwebtoken';
import { env_file } from '../index_env.js';

import { User } from '../models/user.models.js';



export const verifyJWT = asyncHandler(async(req,res,next)=>{
   try {
    // console.log(req);
     const token=req.cookies?.accessToken||req.header("Authorization")?.replace("Bearer ","");
     console.log("---30---verifyJWT----7--token----middleware",Object.keys({}).length===0);
 

     if(Object.keys(token).length===0||!token){
         throw new ApiError(401,"---16---verifyJWT-middleware-Unauthorized request");
     }
 
     const decodedToken=jwt.verify(token,env_file.ACCESS_TOKEN_SECRET);
 
     const user= await User.findById(decodedToken?._id).select("-password -refreshToken");
 
     if(!user){
         throw new ApiError(401,"---24---verifyJWT-middleware----invalid access token");
     }
 
     req.user = user;
     next();
   } catch (err) {
    if (err.name === "TokenExpiredError") {
        console.log("---24---verifyJWT-middleware---",err.name);
        throw new ApiError(401, "---verifyJWT-middleware----Token has expired. Please log in again.");
    }

    
   }

})