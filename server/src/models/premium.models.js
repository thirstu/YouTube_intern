import mongoose,{Schema, Types} from "mongoose";

const premiumSchema=new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    email:{
        type:String,
        required:true,
    },
    isPremium: { type: Boolean, default: false },
    lastDownloadDate: Date,
    plan: { type: String, enum: ["Free", "Bronze", "Silver", "Gold"], default: "Free" },

},{timestamps:true})


export const Premium= mongoose.model('Premium',premiumSchema);