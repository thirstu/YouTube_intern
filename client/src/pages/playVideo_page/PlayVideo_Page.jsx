
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {addVideoToPlay as saveToPlaylist
,createUserPlaylist,} from "../../reducers/playlist.reducer.js";
// import { likeVideo, unlikeVideo, saveToPlaylist } from "../../reducers/video.reducer";
import { FaThumbsUp, FaThumbsDown, FaEllipsisV, FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { addVideoComment,fetchComments,editVideoComment,removeVideoComment } from "../../reducers/comment.reducer.js";
import { toggleSubscription,getChannelSubscribersCount } from "../../reducers/subscription.reducer.js";
import { getLikedVideos,toggleVideoLike,toggleCommentLike } from "../../api/like.api.js";
import CommentsSection from "../../components/comments/CommentsList.jsx";
import PlayList_SaveOptions from "../../components/playlist_controls/PlayList_Controler.jsx";
const PlayVideo_Page = ({likeVideo, unlikeVideo}) => {

   const { videoId } = useParams();
  const [saveDropdownOpen, setSaveDropdownOpen] = useState(false);
  const { state } = useLocation();
  console.log(videoId,state);
  const { subscribedChannels, status ,subscriberCount,
isSubscribed
} = useSelector(
    (state) => {
      console.log(state);
      console.log(state.subscription.channelSubscribers.length,state.subscription.subscribedChannels.length);
      return state.subscription
    }
  );
  console.log(subscribedChannels, status,subscriberCount);
  const {accessToken,user}=useSelector(state=>state.user);
  const commentState=useSelector(state=>state.comments);
  const video = state; // Video data from navigation state
  // const  videoId  = video._id // Get video ID from URL params
  console.log(commentState,user?._id,video?.owner);

  const dispatch = useDispatch();

  
  const [liked, setLiked] = useState(video?.isLiked || false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(commentState?.comments || []);
  const [menuOpen, setMenuOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(isSubscribed || false);


 
  const handleLike = () => {
    liked ? dispatch(unlikeVideo(videoId)) : dispatch(likeVideo(videoId));
    setLiked(!liked);
  };
  const handleSave = () => {
    dispatch(saveToPlaylist(videoId));
    alert("Video saved to playlist!");
    setMenuOpen(false);
  };

  // const handleCommentSubmit = (e) => {
  //   e.preventDefault();
  //   if (!comment.trim()) return;
  //   setComments([...comments, { text: comment, liked: false }]);

  //   console.log(comment,videoId);
  //   dispatch(addVideoComment({comment,videoId}))
  //   setComment("");
  // };

  const toggleSubscribe = ({channelId}) => {
   if(accessToken){
     console.log(channelId);
    dispatch(toggleSubscription(channelId));
    setSubscribed(!subscribed);
   }
  };
  useEffect(() => {
    console.log("hello",accessToken,videoId);

    if (accessToken && videoId) {
      dispatch(getChannelSubscribersCount({channelId:video?.owner}))

      dispatch(fetchComments(videoId));
    setSubscribed(isSubscribed);

      console.log("hello",accessToken,subscribed);

    }
  }, [accessToken, videoId, dispatch]); // Runs when accessToken or videoId changes
   
  // useEffect(() => {
  //   if (commentState.comments) {
  //     setComments(commentState.comments); // Update local state when Redux updates
  //   }
  // }, [commentState.comments]);
//   useEffect(() => {
//     console.log("commentState");

//     dispatch(fetchComments(videoId));
//     console.log(commentState);
// }, []);

// useEffect(() => {
//     console.log(commentState);

//   if (commentState.status === "succeeded") {
//     setComments(commentState.comments);
//     console.log(commentState);

//   }
// }, [commentState.status, commentState.comments]);
  

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-sm">
  {/* Video Player */}
  <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
    <video
      src={video?.videoFile}
      controls
      className="w-full h-full object-cover"
    ></video>
  </div>

  {/* Video Info Row */}
  <div className="flex items-center justify-between mt-5 border-b pb-4">
    <div className="flex items-center gap-4">
      {/* Channel Profile */}
      <img
        src={video?.channelProfile || "/default-avatar.png"}
        alt="Channel"
        className="w-12 h-12 rounded-full object-cover border border-gray-300"
      />
      <div>
        <h2 className="text-xl font-semibold">{video?.title}</h2>
        <p className="text-sm text-gray-500">{subscriberCount} subscribers</p>
      </div>
    </div>

    {/* Subscribe Button */}
   {
    user?._id!==video?.owner? <button
      onClick={()=>toggleSubscribe({channelId:video?.owner})}
      className={`px-5 py-2 rounded-full font-semibold transition ${
        subscribed
          ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
          : "bg-red-600 text-white hover:bg-red-700"
      }`}
    >
      {subscribed ? "Unsubscribe" : "Subscribe"}
    </button>:null
   }
  </div>

  {/* Like/Unlike Row */}
  <div className="flex items-center justify-between mt-4">
    <div className="flex items-center gap-4">
      <button
        onClick={handleLike}
        className="flex items-center gap-2 px-3 py-1 rounded-full border hover:bg-gray-100 transition"
      >
        {liked ? (
          <FaThumbsUp className="text-blue-500" />
        ) : (
          <FaRegThumbsUp />
        )}
        <span>{video?.likes || 0}</span>
      </button>

      <button className="flex items-center gap-2 px-3 py-1 rounded-full border hover:bg-gray-100 transition">
        <FaRegThumbsDown />
      </button>
    </div>

    {/* Menu */}
    <div className="relative">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        <FaEllipsisV />
      </button>

      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border">
          <button
            onClick={() => setSaveDropdownOpen(!saveDropdownOpen)}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Save to Playlist
          </button>

          {saveDropdownOpen && (
            <PlayList_SaveOptions videoId={videoId}/>
          )}
        </div>
      )}
    </div>
  </div>

  {/* Comments */}
  
<CommentsSection videoId={videoId} accessToken={accessToken} />
</div>

  
  );
}

export default PlayVideo_Page
