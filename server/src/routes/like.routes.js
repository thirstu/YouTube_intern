import {Router} from 'express';

import { upload } from '../middleware/multer.middleware.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { deleteFromCloudinary } from '../utils/cloudinary.js';
import {  toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos} from '../controllers/like.controller.js'


const router = Router();
router.use(verifyJWT);



router.route("/toggle-comment-like/:commentId").get(toggleCommentLike);
router.route("/toggle-tweet-like/:tweetId").get(toggleTweetLike);
router.route("/toggle-video-like/:videoId").get(toggleVideoLike);
router.route("/liked-videos/:userId").get(getLikedVideos);


export default router;



// /**
//
//  */
////////if you are using form-data use upload.none() before the controllers multer/// for only data from form-data if receiving files use fields single or array because none is for data only not files