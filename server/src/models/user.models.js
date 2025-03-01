import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

const userSchema=new mongoose.Schema(
    {
        userName:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
        },
        password:{
            type:String,
            required:[true,'password is required'],
        },
        avatar:{
            type:String,//cloudinary url
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        refreshToken:{
            type:String,
        }


    },
    {timestamps:true}

);

/////encrypting user password
userSchema.pre("save", async function (req,res,next){
    if(!this.isModified("password")) return next();
    this.password=await bcryptjs.hash(this.password,10);
    next();

})

///////checking or comparing if stored password and user password are correct
userSchema.methods.isPasswordCorrect= async function (password){
    return await bcryptjs.compare(password,this.password)
}

//////generateAccessToken
userSchema.methods.generateAccessToken= async function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            userName:this.userName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

//////generateRefreshToken
userSchema.methods.generateRefreshToken= async function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User= mongoose.model('User',userSchema)