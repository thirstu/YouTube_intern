
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { videoById} from "../../reducers/video.reducer.js";
// import { likeVideo, unlikeVideo, saveToPlaylist } from "../../reducers/video.reducer";
import { FaThumbsUp, FaThumbsDown, FaEllipsisV, FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { addVideoComment,fetchComments } from "../../reducers/comment.reducer.js";
const PlayVideo_Page = ({likeVideo, unlikeVideo, saveToPlaylist}) => {
  const { state } = useLocation();
  
  const {accessToken}=useSelector(state=>state.user);
  const commentState=useSelector(state=>state.comments);
  console.log(commentState);
  const video = state; // Video data from navigation state
  const  videoId  = video._id // Get video ID from URL params
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(video?.isLiked || false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(commentState?.comments || []);
  const [menuOpen, setMenuOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(video?.isSubscribed || false);


  const handleLike = () => {
    liked ? dispatch(unlikeVideo(videoId)) : dispatch(likeVideo(videoId));
    setLiked(!liked);
  };
  const handleSave = () => {
    dispatch(saveToPlaylist(videoId));
    alert("Video saved to playlist!");
    setMenuOpen(false);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setComments([...comments, { text: comment, liked: false }]);

    console.log(comment,videoId);
    dispatch(addVideoComment({comment,videoId}))
    setComment("");
  };

  const toggleSubscribe = () => {
    setSubscribed(!subscribed);
  };
  useEffect(() => {
    console.log("hello",accessToken);

    if (accessToken && videoId) {
      dispatch(fetchComments(videoId));
      console.log("hello",accessToken);
    }
  }, [accessToken, videoId, dispatch]); // Runs when accessToken or videoId changes
  
  useEffect(() => {
    if (commentState.comments) {
      setComments(commentState.comments); // Update local state when Redux updates
    }
  }, [commentState.comments]);
  

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Video Player */}
      <div className="w-full h-64 bg-black">
        <video src={video?.videoFile} controls className="w-full h-full"></video>
      </div>

      {/* Video Info Row (Profile, Title, Subscribe Button) */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3">
          {/* Channel Profile Picture */}
          <img src={video?.channelProfile} alt="Channel" className="w-10 h-10 rounded-full" />
          <div>
            <h2 className="text-lg font-bold">{video?.title}</h2>
            <p className="text-gray-500">{video?.subscribers} Subscribers</p>
          </div>
        </div>

        {/* Subscribe/Unsubscribe Button */}
        <button
          onClick={toggleSubscribe}
          className={`px-4 py-2 rounded ${subscribed ? "bg-gray-500 text-white" : "bg-red-500 text-white"}`}
        >
          {subscribed ? "Unsubscribe" : "Subscribe"}
        </button>
      </div>

      {/* Video Actions Row (Like, Unlike, More Options) */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-4">
          {/* Like/Unlike Buttons */}
          <button onClick={handleLike} className="flex items-center gap-1">
            {liked ? <FaThumbsUp className="text-blue-500" /> : <FaRegThumbsUp />}
            <span>{video?.likes || 0}</span>
          </button>
          <button className="flex items-center gap-1">
            <FaRegThumbsDown />
          </button>
        </div>

        {/* Three-Dot Menu for More Options */}
        <div className="relative">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <FaEllipsisV />
          </button>
          {menuOpen && (
            <div className="absolute right-0 bg-white shadow-md rounded-md p-2">
              <button onClick={handleSave} className="block w-full text-left px-2 py-1 hover:bg-gray-100">
                Save to Playlist
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-2">Comments</h3>
        <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
            Comment
          </button>
        </form>

        {/* Display Comments */}
        <div>
          
          {commentState?.comments.length > 0 ? (
            comments?.map((cmt, index) => {
              console.log(cmt);


              return (
                <div key={index} className="flex justify-between items-center border-b p-2">
                  <p>{cmt.text}</p>
                  <div className="flex items-center gap-2">
                    <button>
                      <FaRegThumbsUp />
                    </button>
                    <button>
                      <FaRegThumbsDown />
                    </button>
                    <button>
                      <FaEllipsisV />
                    </button>
                  </div>
                </div>
              )
            })
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlayVideo_Page
