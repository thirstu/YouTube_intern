import mongoose, { Schema } from "mongoose";
import bcryptjs from 'bcryptjs'

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    encryptedText: {
      type: String,
      enum: ["text", "image", "video", "file", "audio"],
      default: "text",
    },
    mediaFile: {
      type: String,
    }, 
    file: {
      type: String,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },

    deliveredTo: [
      {
      user:{ 
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      timestamp: { type: Date, default: Date.now },

      },
      
    ],
    readBy: [
    {  
      user:{
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      timestamp: { type: Date, default: Date.now },
    }
      ,
    ],
    /////Allow users to react to messages with emojis.
    reactions: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        emoji: { type: String },
      },
    ],
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },

    isEdited: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);
export const Message = mongoose.model("Message", messageSchema);

const chatRoomSchema = new Schema(
  {
    
      name: { type: String },
      avatar: { type: String },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    
    roomKey: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    participants: [
      {
       user:{ type: Schema.Types.ObjectId,
        ref: "User",},
        role: { type: String, default: "member" }
      },
    ],
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    lastMessage: {
      sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      // content: { 
      //   type: Schema.Types.ObjectId,
      //   ref: "Message",
      // },
      timestamp: { type: Date, default: Date.now },
    },
    roomType: { type: String, enum: ["group", "private", "public"], default: "private" },
    activeUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    pinnedMessages: [{ type: Schema.Types.ObjectId, ref: "Message" }],

    // isGroupChat:{
    //     type:Boolean, default:false

    // },

    ////options:
    /////Track if a user is currently typing.
    typingUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);


chatRoomSchema.pre("save",async function (next){
  if(!this.isModified("password"))return next();
  /**
   * The second argument 10 is the salt rounds, which adds randomness for security.
   */
  this.password=await bcryptjs.hash(this.password,10);
  next();


})

chatRoomSchema.methods.isPasswordCorrect = async function(password){
  return await bcryptjs.compare(password,this.password)

}


export const Chat = mongoose.model("Chat", chatRoomSchema);
