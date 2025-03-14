import mongoose,{Schema} from "mongoose";

const sampleSchema=new Schema({
    name:{
        type:String,
        required:true,
    }
})


export const Sample= mongoose.model('Sample',sampleSchema);