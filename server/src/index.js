import dotenv from 'dotenv'
import { app } from './app.js';
import connectDB from './db/index.js';
import { env_file } from './index_env.js';

dotenv.config({
    path:'./env'
})
// import express, { text } from 'express';
// import mongoose from 'mongoose';
// import { DB_NAME } from './constants.js';
// const express=require('express');





connectDB()
.then(res=>{
    app.on("error",(err)=>{
        console.log(`aaaa  ---- ${err}`);
    })
    app.listen(env_file.PORT||8000,()=>{
        console.log(`server is  listening on ${env_file.PORT}`);
    })

})
.catch(err=>console.error(err,`aaaa----   ${err} MongoDB connection failed src/index.js`));








// const app = express();

// const Port=env_file.PORT || 5000

// app.get('/api/', function(req, res){
//     const text='hello world aur bhi kuchh hai kya'
//     res.send(text);
    
// })

// app.listen(Port, ()=>{
//     console.log(env_file.PORT," ello")
// })


/**
 * ;(async ()=>{
    try {
        await mongoose.connect(`${env_file.MONGO_DB_URI}/${DB_NAME}`)

        app.on('error',(err)=>{
            console.log(err);
            throw err;
        })

        app.listen(process.env.PORT,()=>{
            console.log("listening on port 3000");
        })

        
    } catch (err) {
        console.error(err);
        throw err
        
    }
})()
 */