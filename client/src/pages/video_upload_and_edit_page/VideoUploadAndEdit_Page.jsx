import React, { useState }  from "react"; 
import { publish,updateVideoTo } from "../../reducers/video.reducer";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";



const VideoUploadAndEdit_Page = () => {
    const { state } = useLocation();
    const editingVideo = state?.editingVideo;
    const dispatch = useDispatch();

    const { status,error  } = useSelector((state) => state.videos);
    const {  accessToken } = useSelector((state) => state.user);

    const [videoFile, setVideoFile] = useState(editingVideo?.videoFile || null);
    const [thumbnail, setThumbnail] = useState(editingVideo?.thumbnail || null);
    const [title, setTitle] = useState(editingVideo?.title || "");
    const [description, setDescription] = useState(editingVideo?.description || "");
    const [isEditing, setIsEditing] = useState(!!editingVideo);

    const handleFileChange = (event, setFile) => {
        const file = event.target.files[0];
        if (file) setFile(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);

        if (thumbnail) {
            formData.append("thumbnail", thumbnail);
        }

        if (isEditing&&accessToken) {
            console.log("isEditing&&accessToken-------editing",{formData,videoId:editingVideo._id});
            // formData.append("videoId", editingVideo.id);
            dispatch(updateVideoTo({formData,videoId:editingVideo._id}));
        } else {
            console.log("isEditing&&accessToken-------update");
            formData.append("videoFile", videoFile);
            dispatch(publish(formData));
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 border rounded-lg shadow-lg bg-white">
            <h2 className="text-xl font-bold mb-4">
                {isEditing ? "Update Video" : "Upload Video"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="text" 
                    placeholder="Video Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    className="w-full p-2 border rounded"
                />
                <textarea 
                    placeholder="Video Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    className="w-full p-2 border rounded"
                />
                
                {/* Video upload only for new uploads */}
                {!isEditing && (
                    <input 
                        type="file" 
                        accept="video/*" 
                        onChange={(e) => handleFileChange(e, setVideoFile)}
                        className="w-full p-2 border rounded"
                    />
                )}

                {/* Thumbnail upload available for both upload & edit */}
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleFileChange(e, setThumbnail)}
                    className="w-full p-2 border rounded"
                />

                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white p-2 rounded"
                >
                    {isEditing ? "Update Video" : "Upload"}
                </button>
            </form>
        </div>
    );
}

export default VideoUploadAndEdit_Page;
