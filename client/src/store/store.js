import {configureStore,} from '@reduxjs/toolkit';
import videoReducer from "../reducers/video.reducer.js"
import userReducer from "../reducers/users.reducer.js"
import playlistReducer from "../reducers/playlist.reducer.js"
import commentReducer from "../reducers/comment.reducer.js"
// console.log(videoReducer);
/////configureStore() → Creates a store with a single or multiple reducers.
/////The videos slice will manage the video-related data.
const store =configureStore({
    reducer:{
        videos:videoReducer,
        user:userReducer,
        playlist:playlistReducer,
        comments:commentReducer,
    },
})

export default store;



/////configureStore() → Creates a store with a single or multiple reducers.

/////The videos slice will manage the video-related data.



/////@reduxjs/toolkit → Modern Redux approach (recommended).

//////react-redux → Connects Redux with React.