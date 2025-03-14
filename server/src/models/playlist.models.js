import mongoose,{Schema, Types} from "mongoose";

const playlistSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,

    },
    videos:{
        type:[
            {type:mongoose.Types.ObjectId,
            ref:"Video"
        }
    ],
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"User",
    }

},{timestamps:true})


export const Playlist= mongoose.model('Playlist',playlistSchema);