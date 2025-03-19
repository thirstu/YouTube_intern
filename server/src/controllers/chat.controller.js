import { Chat } from "../models/chat.models.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { v4 as uniqueId4 } from "uuid";
import { useState } from "react";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const createRoom = asyncHandler(async (req, res) => {
  try {
    console.log("hello");
    const user = req.user._id;
    const { name, roomType, password } = req.body;
    const uniqueId = uniqueId4();

    if (!user || !name) {
      return res
        .status(400)
        .json(new ApiError(400, "Name and creator are required"));
    }
    let hashedPassword = null;
    // if(roomType === "private" && password){
    //     hashedPassword =
    // }

    // if(!roomKey)return setUniqueId(uniqueId4());

    const newRoom = await Chat.create({
      createdBy: user,
      name: name,
      roomKey: uniqueId,
      participants: [{ user, role: "admin" }],
      password: password ? password : null,
      roomType: roomType || "private",
    });

    return res
      .status(200)
      .json(new ApiResponse(200, newRoom, "room created successfully"));
  } catch (err) {
    console.error("Error creating room:", err);
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error createRoom --51-- "));
  }
});

const joinRoom = asyncHandler(async (req, res) => {
  console.log("hello");
  const user = req.user._id;
  const { roomKey } = req.body;

  const room = await Chat.findOne({ roomKey, "participants.user": user });

  if (room) {
    return res.status(400).json({ message: "User already exists in room" });
  }

  const roomExist = await Chat.find({ roomKey });
  if (!roomExist) {
    return res.status(404).json(new ApiError(404, "Room not found"));
  }

  const addUser = await Chat.findOneAndUpdate(
    { roomKey },
    {
      $addToSet: { participants: { user } },
    },
    { new: true, runValidators: true },
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, addUser, "user added to the room  successfully"),
    );
});

const grantPermission = asyncHandler(async (req, res) => {
  const admin = req.user._id;
  // const {userIdToUpdate}=req.query;
  const { chatRoomId, userIdToUpdate } = req.params;
  console.log(admin, chatRoomId, userIdToUpdate);

  ////add key string (co leader) to the user inside participants array list
  const chatRoom = await Chat.findOne({
    _id: chatRoomId,
    "participants.user": admin,
    "participants.role": { $in: ["admin", "co-leader"] },
  });

  console.log("chatRoom", chatRoom);

  if (!chatRoom) {
    return res
      .status(404)
      .json(
        new ApiError(
          404,
          "Unauthorized: Only an admin or co-leader can update roles",
        ),
      );
  }

  const updatedUser = await Chat.findOneAndUpdate(
    {
      _id: chatRoomId,
      participants: {
        $elemMatch: {
          user: userIdToUpdate,
          role: { $ne: "admin" },
        },
      },
    },
    {
      $set: { "participants.$.role": "co-leader" },
    },
    { new: true, runValidators: true },
  );

  console.log("updatedUser", updatedUser);

  if (!updatedUser) {
    return res
      .status(400)
      .json(new ApiError(400, {}, "User not found or already an admin."));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Permission granted successfully"));
});

const revokePermission = asyncHandler(async (req, res) => {
  const admin = req.user._id;
  // const {userIdToUpdate}=req.query;
  const { chatRoomId, userIdToUpdate } = req.params;
  console.log(admin, chatRoomId, userIdToUpdate);


  const userHavePermission = await Chat.findOne({
    _id: chatRoomId,
    "participants.user": userIdToUpdate,
    "participants.role": { $in: [ "co-leader"] },
  });

  console.log("userHavePermission", userHavePermission);

  if (!userHavePermission) {
    return res
      .status(404)
      .json(
        new ApiError(
          404,
          {},
          "user  already does not have  co-leader permissions",
        ),
      );
  }

  ////add key string (co leader) to the user inside participants array list
  const chatRoom = await Chat.findOne({
    _id: chatRoomId,
    "participants.user": admin,
    "participants.role": { $in: ["admin", "co-leader"] },
  });

  console.log("chatRoom", chatRoom);

  if (!chatRoom) {
    return res
      .status(404)
      .json(
        new ApiError(
          404,
          {},
          "Unauthorized: Only an admin or co-leader can update roles",
        ),
      );
  }



  const updatedUser = await Chat.findOneAndUpdate(
    {
      _id: chatRoomId,
      participants: {
        $elemMatch: {
          user: userIdToUpdate,
          role: { $ne: "admin" },
        },
      },
    },
    {
      $set: { "participants.$.role": "member" },
    },
    { new: true, runValidators: true },
  );

  console.log("updatedUser", updatedUser);

  if (!updatedUser) {
    return res
      .status(400)
      .json(new ApiError(400, {}, "User not found or already an demoted."));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Permission revoked successfully"));
});

const removeUsers = asyncHandler(async (req, res) => {
  console.log("hello");
  const admin = req.user._id;
  // const {userIdToUpdate}=req.query;
  const { chatRoomId, userIdToBeRemoved } = req.params;
  console.log(admin, chatRoomId, userIdToBeRemoved);

  const userExist = await Chat.findOne({
    _id: chatRoomId,
    "participants.user": userIdToBeRemoved,
    
  });

  console.log("chatRoom", userExist);

  if (!userExist) {
    return res
      .status(404)
      .json(
        new ApiError(
          404,
          {},
          "user does not exist",
        ),
      );
  }
  ////add key string (co leader) to the user inside participants array list
  const chatRoom = await Chat.findOne({
    _id: chatRoomId,
    "participants.user": admin,
    "participants.role": { $in: ["admin","co-leader"] },
  });

  console.log("chatRoom", chatRoom);

  if (!chatRoom) {
    return res
      .status(404)
      .json(
        new ApiError(
          404,
          {},
          "Unauthorized: Only an admin or co-leader can remove users",
        ),
      );
  }

  const updatedUser = await Chat.findOneAndUpdate(
    {
      _id: chatRoomId,
      participants: {
        $elemMatch: {
          user: userIdToBeRemoved,
          role: { $ne: "admin" },
        },
      },
    },
    {
      $pull: { "participants": {user:userIdToBeRemoved} },
    },
    { new: true, runValidators: true },
  );

  console.log("updatedUser", updatedUser);

  if (!updatedUser) {
    return res
      .status(400)
      .json(new ApiError(400, {}, "User not found or already removed."));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "removed successfully"));
});

const getAllRoomsListUserIsPartOf = asyncHandler(async (req, res) => {
  const user = req.user._id;
  // const {chatRoomId}=req.params;

  const chatRoomList = await Chat.find({
    "participants.user": user,
  })
    .select("-messages -password")
    .lean();

  if (!chatRoomList.length) {
    return res
      .status(404)
      .json(new ApiError(404, "User not found in any chat room"));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        chatRoomList,
        "chat room lists of which user is part of  is fetched successfully",
      ),
    );
});

const sendMessage = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const { content, roomKey } = req.body;

  const chatRoomUsers = await Chat.findOne({
    _id: roomKey,
    "participants.user": user,
  });

  if (!chatRoomUsers) {
    return res
      .status(404)
      .json(new ApiError(404, "Users not found in chat room"));
  }

  const deliveredTo = chatRoomUsers.participants
    .map((p) => p.user.toString())
    .filter((id) => id !== user.toString());

  if (!userExist) {
    return res
      .status(404)
      .json(new ApiError(404, "User not found in chat room"));
  }

  const createMessage = await Message.create({
    sender: user,
    content: content,
    deliveredTo: deliveredTo,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, createMessage, "Message sent successfully"));
});

const uploadMediaFile = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const { roomKey } = req.params;
  const { mediaFile } = req.body;

  const chatRoomUsers = await Chat.findOne({
    _id: roomKey,
    "participants.user": user,
  });

  if (!chatRoomUsers) {
    return res
      .status(404)
      .json(new ApiError(404, "Users not found in chat room"));
  }

  const deliveredTo = chatRoomUsers.participants
    .map((p) => p.user.toString())
    .filter((id) => id !== user.toString());

  if (!userExist) {
    return res
      .status(404)
      .json(new ApiError(404, "User not found in chat room"));
  }

  const createMessage = await Message.create({
    sender: user,
    mediaFile: mediaFile,
    deliveredTo: deliveredTo,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, mediaFile, "file sent successfully"));
});

const uploadDocument = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const { file, roomKey } = req.body;

  const chatRoomUsers = await Chat.findOne({
    _id: roomKey,
    "participants.user": user,
  });

  if (!chatRoomUsers) {
    return res
      .status(404)
      .json(new ApiError(404, "Users not found in chat room"));
  }

  const deliveredTo = chatRoomUsers.participants
    .map((p) => p.user.toString())
    .filter((id) => id !== user.toString());

  if (!userExist) {
    return res
      .status(404)
      .json(new ApiError(404, "User not found in chat room"));
  }

  const createMessage = await Message.create({
    sender: user,
    file: file,
    deliveredTo: deliveredTo,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, mediaFile, "file sent successfully"));
});

export {
  createRoom,
  joinRoom,
  grantPermission,
  revokePermission,
  removeUsers,
  getAllRoomsListUserIsPartOf,
  sendMessage,
  uploadMediaFile,
  uploadDocument,
};

/**
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * Field Update Operators
     * 
Operator	Description	Example

$set	Sets the value of a field	{ $set: { name: "John" } }
$unset	Removes a field from a document	{ $unset: { age: "" } }
$rename	Renames a field	{ $rename: { oldName: "newName" } }


Arithmetic Operators

Operator	Description	Example
$inc	Increments a field by a value	{ $inc: { age: 1 } }
$mul	Multiplies a field by a value	{ $mul: { price: 2 } }
$min	Updates the field only if the new value is lower	{ $min: { age: 18 } }
$max	Updates the field only if the new value is higher	{ $max: { score: 100 } }
$currentDate	Sets a field to the current date	{ $currentDate: { lastModified: true } }


Array Update Operators

Operator	Description	Example
$push	Adds an element to an array	{ $push: { tags: "newTag" } }
$addToSet	Adds an element to an array only if it doesn't exist	{ $addToSet: { tags: "uniqueTag" } }
$pop	Removes the first (-1) or last (1) element of an array	{ $pop: { tags: 1 } }
$pull	Removes specific elements from an array	{ $pull: { tags: "oldTag" } }
$pullAll	Removes multiple elements from an array	{ $pullAll: { tags: ["tag1", "tag2"] } }
$each	Used with $push to insert multiple values	{ $push: { tags: { $each: ["tag1", "tag2"] } } }
$position	Specifies position for $push	{ $push: { tags: { $each: ["tag3"], $position: 0 } } }
$slice	Limits the number of elements in an array	{ $push: { tags: { $each: ["tag1"], $slice: 3 } } }
$sort	Sorts array elements	{ $push: { tags: { $each: [], $sort: 1 } } }
Bitwise Operators
Operator	Description	Example
$bit	Performs bitwise operations (and, or, xor)	{ $bit: { flags: { and: 5 } } }


Comparison Operators (for filtering in queries)
Operator	Description	Example
$eq	Matches values equal to a specified value	{ age: { $eq: 25 } }
$ne	Matches values not equal to a specified value	{ age: { $ne: 30 } }
$gt	Matches values greater than a specified value	{ age: { $gt: 18 } }
$gte	Matches values greater than or equal to a specified value	{ age: { $gte: 18 } }
$lt	Matches values less than a specified value	{ age: { $lt: 18 } }
$lte	Matches values less than or equal to a specified value	{ age: { $lte: 18 } }
$in	Matches any value in an array	{ tags: { $in: ["sports", "news"] } }
$nin	Matches values not in an array	{ tags: { $nin: ["sports", "news"] } }
Logical Operators


Operator	Description	Example

$and	Joins multiple query conditions with AND	{ $and: [{ age: { $gt: 18 } }, { status: "active" }] }
$or	Joins multiple query conditions with OR	{ $or: [{ age: { $gt: 30 } }, { city: "New York" }] }
$not	Negates a query expression	{ age: { $not: { $gt: 25 } } }
$nor	Matches documents that fail both conditions	{ $nor: [{ age: { $gt: 18 } }, { status: "active" }] }


Element Operators

Operator	Description	Example
$exists	Checks if a field exists	{ age: { $exists: true } }
$type	Matches field types (string, int, array, etc.)	{ age: { $type: "int" } }
Text Operators
Operator	Description	Example
$text	Performs text search (requires text index)	{ $text: { $search: "MongoDB" } }
$regex	Matches a field using a regular expression	{ name: { $regex: "^A" } }

     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     */
