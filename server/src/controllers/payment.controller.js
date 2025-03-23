import { verifyJWT } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import crypto from "crypto";
import bcryptjs from "bcryptjs";

import { ApiResponse } from "../utils/apiResponse.js";
import nodemailer from "nodemailer";
import Razorpay from "razorpay";
import { User } from "../models/user.models.js";
import { Payment } from "../models/payment.models.js";
import {stripe} from "../app.js";



const stripePayment=asyncHandler(async (req,res)=>{
    try {
        const session =await stripe.checkout.sessions.create({
            payment_method_types:["card",],
            mode:"payment",
            line_items:[
                {
                    price_data:{
                        currency:"inr",
                        product_data:{
                            name:"Premium Plan",
                        },
                        unit_amount:5000,
                    },
                    quantity:1,
                },
            ],
            success_url:"http://localhost:3000/success",
            cancel_url:"http://localhost:3000/cancel"
        })

        return res.status(200).json(new ApiResponse(200, session, "session created"));
        
    } catch (err) {
        return res.status(400).json(new ApiError(400, session, "session failed"));
    }
})



const stripePaymentVerification=asyncHandler(async (req, res) => {
    try {
        const signature=req.headers["stripe-signature"];

        const event=stripe.webhooks.constructEvent(req.body,signature,process.env.STRIPE_WEBHOOK_SECRET)

    } catch (err) {
        console.error(err);
    }
});



































// const razorpay = new Razorpay({
//   key_id: "RAZORPAY_KEY",
//   key_secret: "RAZORPAY_SECRET",
// });

// const createOrder = asyncHandler(async (req, res) => {
//   try {
//     const options = {
//       amount: req.body.amount * 100,
//       currency: "INR",
//       receipt: `order_receiptId_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);
//     console.log(order);

//     return res.status(200).json(new ApiResponse(200, order, "order created"));
//   } catch (err) {
//     console.error(err);
//     return res
//       .status(400)
//       .json(new ApiError(400, { error: err.message }, "order created"));
//   }
// });

// const savePaymentData = asyncHandler(async (req, res) => {
//   try {
//     const { order_id, payment_id, signature, amount, status } = req.body;

//     const payment = await Payment.create({
//       order_id,
//       payment_id,
//       signature,
//       amount,
//       status,
//     });

//     return res
//       .status(200)
//       .json(new ApiResponse(200, payment, "Payment saved successfully!"));
//   } catch (err) {
//     console.error(err);
//     return res
//       .status(500)
//       .json(
//         new ApiError(
//           500,
//           { error: err.message },
//           "something went wrong--savePaymentData--controller--payment",
//         ),
//       );
//   }
// });

// const verifyPayment = asyncHandler(async (req, res) => {
//   try {
//     const { order_id, payment_id, signature } = req.body;

//     const secret = "YOUR_KEY_SECRET";
//     const body = order_id + "|" + payment_id;
//     const expectedSignature = crypto
//       .createHmac("sha256", secret)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature === signature) {
//       return res
//         .status(200)
//         .json(new ApiResponse(200, expectedSignature, "Payment verified"));
//     } else {
//       return res
//         .status(400)
//         .json(
//           new ApiError(
//             400,
//             { message: "Invalid Payment!" },
//             "Invalid Payment!",
//           ),
//         );
//     }
//   } catch (err) {
//     console.error(err);
//   }
// });

// const verifyPaymentStatus = asyncHandler(async (req, res) => {
//   try {
//     const payment = await razorpay.payments.fetch(req.params.payment_id);
//     return res
//       .status(200)
//       .json(new ApiResponse(200, payment, "Payment status"));
//   } catch (err) {
//     console.error(err);
//     return res
//       .status(400)
//       .json(new ApiError(400, { error: err.message }, "status error"));
//   }
// });

// export default {
//   createOrder,
//   savePaymentData,
//   verifyPayment,
//   verifyPaymentStatus,
// };
