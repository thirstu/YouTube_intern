import {Router} from 'express';

import { upload } from '../middleware/multer.middleware.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { getVideoComments,addComment, 
    updateComment,
     deleteComment } from '../controllers/comment.controller.js';



const router = Router();
router.use(verifyJWT);


router.route("/comment/:videoId").get(getVideoComments);
router.route("/add-comments").post(upload.none(),addComment);
router.route("/update-comments").post(upload.none(),updateComment);
router.route("/delete-comments").post(upload.none(),deleteComment);


export default router;


/**
 * getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
 */
////////if you are using form-data use upload.none() before the controllers multer/// for only data from form-data if receiving files use fields single or array because none is for data only not files