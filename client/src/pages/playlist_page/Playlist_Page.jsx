import React, { useEffect, useState } from "react";
import PlaylistCard from "../../components/playlist_card/Playlist_Card.jsx";
import { getUserPlays } from "../../reducers/playlist.reducer.js";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function Playlist_Page() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.user);
  const { playlists ,status,error} = useSelector((state) => state.playlist); // assuming it's in state.user
  const [section, setSection] = useState("videos");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
      if (location.pathname === "/playlist" && accessToken) {
        dispatch(getUserPlays());
        setIsLoading(false);
      }
   
  }, [dispatch, accessToken, location.pathname]);

  // console.log(playlists);

  if (isLoading) {
    return <div className="playlist_page">Loading your playlists...</div>;
  }
  let data;
  if(playlists&&accessToken){
    console.log(playlists);
    data=(
      <div className="playlist_page">
        <h2 className="page_title">Your Playlists</h2>
        <div className="playlist_list">
          {playlists?.length > 0 ? (
            playlists.map((playlist) => (
              <PlaylistCard key={playlist?._id} playlist={playlist} />
            ))
          ) : (
            <p className="no_playlists">No playlists found.</p>
          )}
        </div>
      </div>
    );
  }

  return data;
      
}

export default Playlist_Page
