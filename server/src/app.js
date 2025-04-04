import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser"
import Stripe from "stripe";



const stripe=Stripe(process.env.STRIPE_SECRET_KEY);
const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}))

// for taking data from form
app.use(express.json({limit:"16kb"}))
// for taking data from form

// for taking data from url
app.use(express.urlencoded({extended:true,limit:"16kb"}))
//for taking data from url

//for storing static fils files
app.use(express.static("public"))
//for storing static fils files

//for storing data for performing crud operations ()
app.use(cookieParser());






////routes



import  comment  from './routes/comment.routes.js';
import  dashboard  from './routes/dashboard.routes.js';
import  healthCheck  from './routes/health.routes.js';

import  like  from './routes/like.routes.js';
import  chat  from './routes/chatRoom.routes.js';
import  playlist  from './routes/playlist.routes.js';
import  subscription  from './routes/subscription.routes.js';
import  tweet  from './routes/tweet.routes.js';
import userRouter
from './routes/user.routes.js'
import  video  from './routes/video.routes.js';
import  premium  from './routes/premium.routes.js';
import  payment  from './routes/payment.routes.js';


/////routes declarations
app.use("/api/v1/comment",comment)
app.use("/api/v1/dashboard",dashboard)
app.use("/api/v1/health",healthCheck)
app.use("/api/v1/healthCheck",healthCheck)
app.use("/api/v1/like",like)
app.use("/api/v1/chat",chat)
app.use("/api/v1/playlist",playlist)
app.use("/api/v1/subscription",subscription)
app.use("/api/v1/tweet",tweet)
app.use("/api/v1/users",userRouter)
app.use("/api/v1/video",video)
app.use("/api/v1/premium",premium)
app.use("/api/v1/payment",payment)



////http://localhost:8000/api/v1/users/register
// app.use((err, req, res, next) => {
//     console.error("Global Error Middleware:", err); // Debugging
  
//     const statusCode = err.statusCode || 500;
//     const message = err.message || "Internal Server Error";
  
//     res.status(statusCode).json({
//       success: false,
//       message,
//       errors: err.errors || [],
//       data: err.data || null,
//     });
//   });

export {app,stripe}