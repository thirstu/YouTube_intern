console.log('hello world');
import { env_file } from './index_env.js';
import express from 'express';
// const express=require('express');

const app = express();

const Port=3000;

app.get('/', function(req, res){
    res.send('hello world aur bhi kuchh hai kya');
    
})

app.listen(Port, ()=>{
    console.log(env_file.PORT);
})