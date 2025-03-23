import mongoose,{Schema} from "mongoose";

const paymentSchema=new Schema({
    order_id:{
        type:String,
        required:true,
    },
    payment_id:{
        type:String,
        required:true,
    },
    signature:{
        type:String,
        required:true,
    },
    amount:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    created_at:{
        type:Date,
        default:Date.now,
    },
},{timestamps:true});

export const Payment=mongoose.model("Payment",paymentSchema);