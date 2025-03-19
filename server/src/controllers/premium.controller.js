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



const sendPurchaseInvoice= asyncHandler(async (req, res) => {
    const {email,plan,amount}=req.body;
    const transporter= nodemailer.createTransport({service:"Gmail",auth:{user:"your-email@gmail.com",pass:"your-password"}});

    const mailOptions={
        from:"your-email@gmail.com",
        to:email,
        subject:"Subscription Payment Successful",
        text: `You have successfully subscribed to the ${plan} plan. Amount paid: ₹${amount}.`,
    }

    await transporter.sendMail(mailOptions)
})

const makePaymentRequest = asyncHandler(async (req, res) => {
    const { plan } = req.body;

    const amount =plan === "Bronze" ? 10 : plan === "Silver" ?50:100;

    const order =await razorpay.orders.create({
        amount,
        currency:"INR",
    })

    res.json({orderId:order.id, amount})
})


const updateUserPlan=asyncHandler(async (req, res) => {
    const {order_Id,razorpay_payment_id,plan}=req.body;

    const user=await User.findById(req.user?._id);

    await sendPurchaseInvoice(req.body={email:user.email,plan,price:(()=>plan === "Bronze" ? 10 : plan === "Silver" ? 50 : 100)()})

    res.json({success:true});

})