import {Router} from 'express';

import { upload } from '../middleware/multer.middleware.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { deleteVideo,getAllVideos,getVideoById,publishAVideo,togglePublishStatus,updateVideo } from '../controllers/video.controller.js';

const router = Router();
router.use(verifyJWT);



router.route("/upload").post(upload.fields([
    {
        name:"videoFile",
        maxCount:1,
    },
    {
        name:"thumbnail",
        maxCount:1,
    }
    ]),publishAVideo);
router.route("/video/:videoId").get(getVideoById);
router.route("/all-videos?").get(getAllVideos);
router.route("/toggle/:videoId").get(togglePublishStatus);
router.route("/update/:videoId").post(upload.single("thumbnail"),updateVideo);
router.route("/delete/:videoId").get(deleteVideo);


export default router;



////////if you are using form-data use upload.none() before the controllers multer/// for only data from form-data if receiving files use fields single or array because none is for data only not files