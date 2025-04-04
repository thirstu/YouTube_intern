import { API } from "./user.api.js";

const createRoom=async()=>await API.get("/chat/create-room");
const joinRoom=async()=>await API.get("/chat/join-room");
const grantPermission=async()=>await API.get("/chat/grant/:chatRoomId/:userIdToUpdate");
const removeUsers=async()=>await API.get("/chat/revoke/:chatRoomId/:userIdToUpdate");
const getAllRoomsListUserIsPartOf=async()=>await API.get("/chat/all-rooms");
const sendMessage=async()=>await API.get("/chat/message/:chatRoomId/:receiverId");
const deleteMessage=async()=>await API.get("/chat/delete-message/:chatRoomId/:messageId");
const uploadMediaFile=async()=>await API.get("/chat/upload/:chatRoomId");
const uploadDocument=async()=>await API.get("/chat/upload-document/:chatRoomId");



export {}
