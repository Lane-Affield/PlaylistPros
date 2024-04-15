import { useState, useEffect } from "react";
import axios from "axios";
function AddQueue({track_uri}){
  const addQueue = async () => { // Toggle playing state
    const url = "http://127.0.0.1:5000/session/queue/" + track_uri + "/";
    const response = await axios.get(url); // Assuming a pause endpoint
    console.log(response.data)
    // Handle response from pause endpoint (optional)
  };

  return(
  <svg onClick={addQueue} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
  </svg>);
}

function BanSong({track_uri}){
  const banSong = async () => { // Toggle playing state
    const url = "http://127.0.0.1:5000/session/ban/" + track_uri;
    const response = await axios.get(url); // Assuming a pause endpoint
    console.log(response.data)
    // Handle response from pause endpoint (optional)
  };

  return(
  <svg onClick={banSong} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-ban" viewBox="0 0 16 16">
    <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/>
  </svg>
  );
}


function SongSearch({song}) {
  // Destructure props for cleaner access (assuming song is an object with properties)
  const { artist_name = "", album_img = "", track_name = "", song_uri = "" } = song || {}; // Handle potential undefined values
  return (
    <div className="container text-center ">
      <div className="row align-items-start">
        <div className="col">
          <div className= "col">
            <AddQueue track_uri={song_uri}/>
          </div>
          <div className= "col">
            <BanSong track_uri={song_uri}/>
          </div>

        </div>
        <div className="col">
          <img src={album_img} alt="Album Cover" height={64}/>  {/* Added alt text for accessibility */}
        </div>
        <div className="col">
          <p>
            {track_name} {artist_name && `by ${artist_name}`}  {/* Conditionally render artist name */}
          </p>
        </div>
      </div>
    </div>
  );
}
function SearchResults({ songs }) {
  if (!songs || songs.length === 0) {
    return <p>No songs found.</p>;
  }

  return (
    <div>
      {songs.map((song) => (
        <SongSearch key={song.song_uri} song = {song} {...song} /> // Spread song data as props
      ))}
    </div>
  );
}
  

export default SearchResults;
