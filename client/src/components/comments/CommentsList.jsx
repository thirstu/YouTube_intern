// components/CommentsSection.jsx
import React, { useState, useEffect } from "react";
import { FaRegThumbsUp, FaRegThumbsDown, FaEllipsisV } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addVideoComment,
  fetchComments,
  editVideoComment,
  removeVideoComment,
} from "../../reducers/comment.reducer.js";

const CommentsSection = ({ videoId, accessToken }) => {
  const dispatch = useDispatch();
  const commentState = useSelector((state) => state.comments);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  // Fetch comments when video or user changes
  useEffect(() => {
    console.log("hello",videoId);
    if (accessToken && videoId) {
      dispatch(fetchComments(videoId));
    }
    console.log("hello",videoId);

  }, [accessToken, videoId, dispatch]);

  // Sync local comments with Redux state
  useEffect(() => {
    console.log("hello",commentState);
    console.log("hello",comments);

    if (commentState.comments) {
      setComments(commentState.comments);
    }
    console.log("hello",comments);

  }, [commentState.comments]);

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    dispatch(addVideoComment({ comment: commentText, videoId }));
    setCommentText("");
  };

  const startEditing = (index, text) => {
    setEditingIndex(index);
    setEditText(text);
    setOpenMenuIndex(null);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditText("");
  };

  const saveEdit = (comment) => {
    const {_id}=comment
    if (!editText.trim()) return;
    dispatch(
      editVideoComment({
        _id,
        editText
      })
    );
    cancelEdit();
  };

  const deleteComment = (comment) => {
    console.log(comment);
    dispatch(removeVideoComment(comment._id));
    dispatch(fetchComments(videoId));
    setOpenMenuIndex(null);
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Comment
        </button>
      </form>

      {/* Comment List */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((cmt, index) => (
            <div
              key={cmt._id || index}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border relative"
            >
              {/* Edit Mode or Display Mode */}
              {editingIndex === index ? (
                <div className="flex flex-1 gap-2">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 border rounded px-2 py-1 text-sm"
                    autoFocus
                  />
                  <button
                    onClick={() => saveEdit(cmt)}
                    className="text-blue-500 text-sm hover:underline"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="text-gray-500 text-sm hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <p>{cmt.content}</p>
              )}

              {/* Actions */}
              <div className="flex items-center gap-3 text-gray-500">
                <button className="hover:text-blue-500">
                  <FaRegThumbsUp />
                </button>
                <button className="hover:text-red-500">
                  <FaRegThumbsDown />
                </button>

                {/* Three-dot Menu */}
                <div className="relative">
                  <button
                    onClick={() => toggleMenu(index)}
                    className="hover:text-gray-700"
                  >
                    <FaEllipsisV />
                  </button>
                  {openMenuIndex === index && (
                    <div className="absolute right-0 mt-2 w-28 bg-white shadow-md rounded-lg border z-10">
                      <button
                        onClick={() =>
                        { 
                          console.log(index, cmt?.comment?.content,cmt);
                          startEditing(index, cmt?.content)}
                        }
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteComment(cmt)}
                        className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
