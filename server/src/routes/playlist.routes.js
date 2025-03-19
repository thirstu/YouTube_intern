import {Router} from 'express';

import { upload } from '../middleware/multer.middleware.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { addVideoToPlaylist,createPlaylist,deletePlaylist,getPlaylistById,getUserPlaylists,removeVideoFromPlaylist,updatePlaylist, } from '../controllers/playlist.controller.js';

const router = Router();
router.use(verifyJWT);



router.route("/create").post(upload.none(),createPlaylist);
router.route("/add-video/:videoId").get(upload.none(),addVideoToPlaylist);
router.route("/get/:playlistId").get(getPlaylistById);
router.route("/get-playlists").get(getUserPlaylists);
router.route("/update/:playlistId").post(upload.none(),updatePlaylist);
router.route("/remove-video/:videoId").get(upload.none(),removeVideoFromPlaylist);
router.route("/delete/:playlistId").get(upload.none(),deletePlaylist);


export default router;



////////if you are using form-data use upload.none() before the controllers multer/// for only data from form-data if receiving files use fields single or array because none is for data only not files