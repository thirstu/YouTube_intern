console.log('hello world');
import { env_file } from '../index_env.js';
import express, { text } from 'express';
import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';
// const express=require('express');



const connectDB=async()=>{
    try {
        const connectionResponse=await mongoose.connect(`${env_file.MONGO_DB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionResponse.connection.host}`);
    } catch (err) {
        console.error(err,'aaaaa---------mongodb connection failed db/index.js');
        process.exit(1  )
        
    }
}


export default connectDB














/**
 * const app = express();

const Port=env_file.PORT || 5000

app.get('/api/', function(req, res){
    const text='hello world aur bhi kuchh hai kya'
    res.send(text);
    
})

app.listen(Port, ()=>{
    console.log(env_file.PORT," ello")
})

 */

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