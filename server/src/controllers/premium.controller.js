    import {verifyJWT} from "../middleware/auth.middleware.js";
    import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const razorpay = new Razorpay({
    key_id: "RAZORPAY_KEY",
    key_secret: "RAZORPAY_SECRET",
  });
import nodemailer from "nodemailer";
import Razorpay from "razorpay";
import { User } from "../models/user.models.js";
import { Premium } from "../models/premium.models.js";
import { Payment } from "../models/payment.models.js";

const downloadVideo=asyncHandler(async (req,res)=>{
    const userId=req.user._id;

    const user=await User.findById(user);
    const today = new Date().toISOString().split("T")[0];

    if(user.plan === "free" && user.lastDownloadDate === today) {
        return res
        .status(400)
        .json(new ApiError(400,"Free users can download only one video per day"));

    }

    user.lastDownloadDate= today;

    await user.save();

    res.download(`video/${req.params.videoId}.mp4`);



    


})





const updateUserPlan=asyncHandler(async (req, res) => {
    try {
        const payment=await Payment.findOne({sessionId: req.params.sessionId});
    
        if(!payment){
            return res.status(404).json(new ApiError(404,{ error: "Payment session not found" },"Payment session not found"));
        }
    
        if (payment.paymentStatus !== "paid") {
           
            return res.status(404).json(new ApiError(404,{ error: "Payment not completed" },"Payment not completed"));
          }
      
          
      
          return res.status(200).json(new ApiResponse(200,{ success: true, message: "Payment verified", payment },"Payment verified"));
    } catch (error) {
        return res.status(500).json(new ApiError(500,{ error: "Internal server error" },"Internal server error"));
    }
})


const paymentHistory=asyncHandler(async (req, res) => {
    try {
        const payments=await Payment.find({userId: req.params.userId}).sort({createdAt:-1});
    
        if(!payments){
            return res.status(404).json(new ApiError(404,{ payments },"Payment  not found"));
        }
    
        
      
          
      
          return res.status(200).json(new ApiResponse(200,{ success: true, payments },"Payment verified"));
    } catch (error) {
        return res.status(500).json(new ApiError(500,{ error: "Internal server error" },"Internal server error"));
    }
})

export {
    downloadVideo,
    paymentHistory,
    updateUserPlan,
}