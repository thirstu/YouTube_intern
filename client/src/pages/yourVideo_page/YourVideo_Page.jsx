import React ,{useEffect}from 'react'
import { LiaDownloadSolid } from 'react-icons/lia';
import { RxDotsVertical } from 'react-icons/rx';
import { getUsersAllVideos } from '../../api/video.api';
import { usersAllVideos } from '../../reducers/video.reducer';
import { useDispatch,useSelector } from 'react-redux';
import Video_Card from '../../components/video_card/Video_Card';
const YourVideo_Page = () => {
  const dispatch = useDispatch();

  const { channelVideos, loading, error } = useSelector(state => {
    console.log(state.videos);
    return state.videos;
  });

  useEffect(() => {
    dispatch(usersAllVideos());
  }, [dispatch]);

  return (
    <div className="component_container">
      <div className="your_videos_page_container">
        <h1>Your Videos</h1>

        {loading && <p>Loading videos...</p>}
        {error && <p>Error fetching videos</p>}

        <div className="right_liked_videos_container">
          {channelVideos.data?.length > 0 ? (
            channelVideos.data?.map((video, index) => (
              <Video_Card video={video}/>
            ))
          ) : (
            <p>No videos found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default YourVideo_Page
