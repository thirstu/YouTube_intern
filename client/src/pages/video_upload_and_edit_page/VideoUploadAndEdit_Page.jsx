import React, { useState } from "react"; 
import { publish, updateVideoTo } from "../../reducers/video.reducer";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const VideoUploadAndEdit_Page = () => {
    const location = useLocation();
    const editingVideo = location.state?.editingVideo || null;

    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.videos);
    const { accessToken } = useSelector((state) => state.user);

    const [videoFile, setVideoFile] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [title, setTitle] = useState(editingVideo?.title || "");
    const [description, setDescription] = useState(editingVideo?.description || "");
    const [isEditing] = useState(!!editingVideo);

    const [showVideoInput, setShowVideoInput] = useState(false);
    const [showThumbnailInput, setShowThumbnailInput] = useState(false);

    const handleFileChange = (event, setFile) => {
        const file = event.target.files[0];
        if (file) setFile(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);

        if (thumbnail) formData.append("thumbnail", thumbnail);
        if (isEditing && accessToken) {
            if (videoFile) formData.append("videoFile", videoFile);
            dispatch(updateVideoTo({ formData, videoId: editingVideo._id }));
        } else {
            if (videoFile) formData.append("videoFile", videoFile);
            dispatch(publish(formData));
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
                    {isEditing ? "✏️ Update Video" : "📤 Upload Video"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Title */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Video Title</label>
                        <input 
                            type="text" 
                            placeholder="Enter video title" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Video Description</label>
                        <textarea 
                            placeholder="Write a short description..." 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none min-h-[100px]"
                        />
                    </div>

                    {/* Media Section */}
                    {isEditing ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Current Video */}
                            <div>
                                <label className="block font-medium text-gray-700 mb-1">Current Video</label>
                                <video 
                                    src={editingVideo.videoFile} 
                                    controls 
                                    className="w-full rounded-lg shadow-md"
                                />
                                {!showVideoInput ? (
                                    <button
                                        type="button"
                                        onClick={() => setShowVideoInput(true)}
                                        className="mt-3 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 transition-all"
                                    >
                                        Change Video File
                                    </button>
                                ) : (
                                    <div className="mt-3">
                                        <input 
                                            type="file" 
                                            accept="video/*" 
                                            onChange={(e) => handleFileChange(e, setVideoFile)}
                                            className="w-full border border-gray-300 p-2 rounded-lg cursor-pointer bg-gray-50"
                                        />
                                        {videoFile && (
                                            <video 
                                                src={URL.createObjectURL(videoFile)} 
                                                controls 
                                                className="mt-3 w-full rounded-lg shadow-md"
                                            />
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Current Thumbnail */}
                            <div>
                                <label className="block font-medium text-gray-700 mb-1">Current Thumbnail</label>
                                <img 
                                    src={editingVideo.thumbnail} 
                                    alt="Thumbnail" 
                                    className="w-full h-48 object-cover rounded-lg shadow-md"
                                />
                                {!showThumbnailInput ? (
                                    <button
                                        type="button"
                                        onClick={() => setShowThumbnailInput(true)}
                                        className="mt-3 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 transition-all"
                                    >
                                        Change Thumbnail
                                    </button>
                                ) : (
                                    <div className="mt-3">
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            onChange={(e) => handleFileChange(e, setThumbnail)}
                                            className="w-full border border-gray-300 p-2 rounded-lg cursor-pointer bg-gray-50"
                                        />
                                        {thumbnail && (
                                            <img 
                                                src={URL.createObjectURL(thumbnail)} 
                                                alt="New Thumbnail" 
                                                className="mt-3 w-full h-48 object-cover rounded-lg shadow-md"
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Upload Video */}
                            <div>
                                <label className="block font-medium text-gray-700 mb-1">Upload Video File</label>
                                <input 
                                    type="file" 
                                    accept="video/*" 
                                    onChange={(e) => handleFileChange(e, setVideoFile)}
                                    className="w-full border border-gray-300 p-2 rounded-lg cursor-pointer bg-gray-50"
                                />
                                {videoFile && (
                                    <video 
                                        src={URL.createObjectURL(videoFile)} 
                                        controls 
                                        className="mt-3 w-full rounded-lg shadow-md"
                                    />
                                )}
                            </div>

                            {/* Upload Thumbnail */}
                            <div>
                                <label className="block font-medium text-gray-700 mb-1">Upload Thumbnail</label>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={(e) => handleFileChange(e, setThumbnail)}
                                    className="w-full border border-gray-300 p-2 rounded-lg cursor-pointer bg-gray-50"
                                />
                                {thumbnail && (
                                    <img 
                                        src={URL.createObjectURL(thumbnail)} 
                                        alt="Thumbnail Preview" 
                                        className="mt-3 w-full h-48 object-cover rounded-lg shadow-md"
                                    />
                                )}
                            </div>
                        </>
                    )}

                    {/* Submit */}
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white p-3 rounded-lg font-medium"
                    >
                        {isEditing ? "Update Video" : "Upload"}
                    </button>

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-500 text-sm text-center mt-2">{error}</p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default VideoUploadAndEdit_Page;
