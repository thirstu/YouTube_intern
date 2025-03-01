import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser"

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

import userRouter
from './routes/user.routes.js'


/////routes declarations
app.use("/api/v1/users",userRouter)



////http://localhost:8000/api/v1/users/register

export {app}