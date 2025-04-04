// import { verifyJWT } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import crypto from "crypto";
import bcryptjs from "bcryptjs";

import { ApiResponse } from "../utils/apiResponse.js";
// import nodemailer from "nodemailer";
// import Razorpay from "razorpay";
import { User } from "../models/user.models.js";
import { Payment } from "../models/payment.models.js";
import { stripe } from "../app.js";
import { error } from "console";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { Premium } from "../models/premium.models.js";




const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use App Password if using Gmail
  },
});


export const sendPaymentReceipt = async (to, amount, currency) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Payment Receipt",
    html: `<h1>Payment Successful</h1>
           <p>Thank you for your purchase!</p>
           <p><strong>Amount:</strong> ${amount} ${currency.toUpperCase()}</p>
           <p>We appreciate your business.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Payment receipt email sent to:", to);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
};









const stripePayment = asyncHandler(async (req, res) => {
  try {

    const user = req.user;
    const {  price } = req.body;


    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Premium Plan",
            },
            unit_amount: price*100,
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/cancel",
    });

    const createPayment=await Payment.create({
        userId: user._id,
        sessionId: session.id,
        amountTotal:session.amount_total,
        currency:session.currency,
        paymentStatus:session.payment_status,
      
    })

    return res
      .status(200)
      .json(new ApiResponse(200, {session,createPayment}, "session created"));
  } catch (err) {
    return res.status(400).json(new ApiError(400, session, "Could not create checkout session"));
  }
});


const stripePaymentVerification = asyncHandler(async (req, res) => {
    const signature = req.headers["stripe-signature"];
    let event;
  try {
    

     event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    if(event.type==="checkout.session.completed"){

      const session= event.data.object;
      const payment=await Payment.findOneAndUpdate({sessionId: session.id},
          {paymentStatus:"paid",paymentIntentId:session.payment_intent}
      );
      console.log("✅ Payment completed:", session.id);

      console.log("✅ Payment completed:", session.id);

      await sendPaymentReceipt(session.customer_email, payment.amount, payment.currency);

          // Find the user and upgrade subscription
    const premium = await Premium.findOne({ email: session.customer_email });

    if (premium) {
      let newSubscription;
      const amountPaid = session.amount_total / 100; // Convert cents to dollars

      if (amountPaid === 10) newSubscription = "bronze";
      else if (amountPaid === 50) newSubscription = "silver";
      else if (amountPaid === 100) newSubscription = "gold";



      const updatePremium=await Premium.findOneAndUpdate({email:session.customer_email},{
        isPremium: true, plan: newSubscription,

      },{ new: true, upsert: true })

      console.log(`✅ User ${premium.email} upgraded to ${newSubscription} plan.`);
    }



    }else if(event.type==="checkout.session.expired"){
      const payment=await Payment.findOneAndUpdate({sessionId: event.data.object.id },
        {paymentStatus:"failed",paymentIntentId:session.payment_intent}
    );
    
    
    }

  // Send email receipt to user
   
  return res
  .status(200)
  .json(new ApiResponse(200, { received: true }, "Payment completed"));
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json(new ApiError(400, {error:err.message}, "Webhook signature verification failed"));
  }

});











// //////////////////////////////////////
// //////////////////////////////////////
// //////////////////////////////////////
// //////////////////////////////////////



const stripeRetrieveBalance = asyncHandler(async (req, res) => {
  try {
    const signature = req.headers["stripe-signature"];

    const event = await stripe.balance.retrieve({
      stripeAccount: "{{CONNECTED_ACCOUNT_ID}}",
    });
  } catch (err) {
    console.error(err);
  }
});

const stripeProductList = asyncHandler(async (req, res) => {
  try {
    const signature = req.headers["stripe-signature"];

    const products = await stripe.products.list(
      {
        limit: 5,
      },
      {
        stripeAccount: "{{CONNECTED_ACCOUNT_ID}}",
      },
    );
  } catch (err) {
    console.error(err);
  }
});

const stripeDeleteCustomer = asyncHandler(async (req, res) => {
    try {
      const signature = req.headers["stripe-signature"];
  
      const deleted = await stripe.customers.del(
        '{{CUSTOMER_ID}}',
        {
          stripeAccount: '{{CONNECTED_ACCOUNT_ID}}',
        }
      );

    } catch (err) {
      console.error(err);
    }
  });


  const stripeGetAccount = asyncHandler(async (req, res) => {
    try {
      
  
      const account = await stripe.accounts.retrieve('{{CONNECTED_ACCOUNT_ID}}');

    } catch (err) {
      console.error(err);
    }
  });




  const stripeCreateCustomer = asyncHandler(async (req, res) => {
    try {
      
  
        const customer = await stripe.customers.create(
            {
              email: 'person@example.com',
            },
            {
              stripeAccount: '{{CONNECTED_ACCOUNT_ID}}',
            }
          );

    } catch (err) {
      console.error(err);
    }
  });


export  {
    stripePayment,
    stripePaymentVerification,
    stripeRetrieveBalance,
    stripeProductList,
    stripeDeleteCustomer,
    stripeGetAccount,
    stripeCreateCustomer
};










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
