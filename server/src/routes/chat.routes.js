import {Router} from 'express';

import { upload } from '../middleware/multer.middleware.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import {  
    createRoom,
    joinRoom,
    grantPermission,
    revokePermission,
    removeUsers,
    getAllRoomsListUserIsPartOf,
    sendMessage,
    uploadMediaFile,
    uploadDocument, } from '../controllers/chat.controller.js';

const router = Router();
router.use(verifyJWT);




router.route("/create-room").post(upload.none(),createRoom);
router.route("/join-room").post(upload.none(),joinRoom);
router.route("/grant/:chatRoomId/:userIdToUpdate").get(grantPermission);

router.route("/revoke/:chatRoomId/:userIdToUpdate").get(revokePermission);

router.route("/remove-user/:chatRoomId/:userIdToBeRemoved").get(removeUsers);

router.route("/all-rooms/:chatRoomId").get(upload.none(),getAllRoomsListUserIsPartOf);
router.route("/message/:chatRoomId").get(upload.none(),sendMessage);
router.route("/upload/:chatRoomId").get(upload.fields([
    {
        name:"mediaFile",
        maxCount:1
        
    }
]),uploadMediaFile);
router.route("/upload-document/:chatRoomId").get(upload.fields([
    {
        name:"file",
        maxCount:1
    }
]),uploadDocument);



export default router;



////////if you are using form-data use upload.none() before the controllers multer/// for only data from form-data if receiving files use fields single or array because none is for data only not files