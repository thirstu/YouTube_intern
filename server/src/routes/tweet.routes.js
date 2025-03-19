import {Router} from 'express';

import { upload } from '../middleware/multer.middleware.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { createTweet,deleteTweet,getUserTweets,updateTweet } from '../controllers/tweet.controller.js';

const router = Router();
router.use(verifyJWT);


router.route("/create").post(upload.none(),createTweet);
router.route("/get").get(getUserTweets);
router.route("/update/:tweetId").post(upload.none(),updateTweet);
router.route("/delete/:tweetId").get(deleteTweet);


export default router;




////////if you are using form-data use upload.none() before the controllers multer/// for only data from form-data if receiving files use fields single or array because none is for data only not files