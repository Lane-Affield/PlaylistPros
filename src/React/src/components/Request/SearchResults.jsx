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
    <button onClick={addQueue}>Request</button>
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
