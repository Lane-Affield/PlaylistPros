import { useState, useEffect } from "react";
import axios from "axios";
import "../../Styling/glasseffect.css"

function Pause(){
  const pauseSong = async () => { // Toggle playing state
    const response = await fetch("http://127.0.0.1:5000/pause"); // Assuming a pause endpoint
    // Handle response from pause endpoint (optional)
  };

  return(
    
  <svg onClick = {pauseSong} xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
  </svg>
  );

}

function Play(){
  const pauseSong = async () => { // Toggle playing state
    const response = await fetch("http://127.0.0.1:5000/pause"); // Assuming a pause endpoint
    // Handle response from pause endpoint (optional)
  };

  return(

    <svg  onClick = {pauseSong} xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
    </svg>
  );

}

function PausePlay(){
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        setIsPlaying(prevState => !prevState);
    };

    return (
        <div onClick={togglePlay }>
            {isPlaying ? <Pause /> : <Play />}
        </div>
    );
}


function Player() {
  const [songInfo, setSongInfo] = useState({});
  const [isPlaying, setIsPlaying] = useState(false); // State for playback state

  useEffect(() => {
    const fetchSongInfo = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/song_info");
        const data = await response.data;
        setSongInfo(data);
      } catch (error) {
        console.error("Error fetching song info:", error);
      }
      setTimeout(fetchSongInfo, 1000);
    };

    fetchSongInfo();
  }, []);

  const pauseSong = async () => { // Toggle playing state
    const response = await fetch("http://127.0.0.1:5000/pause"); // Assuming a pause endpoint
    // Handle response from pause endpoint (optional)
  };

  const nextSong = async () => {
    // Similar logic for next song endpoint
    const response = await fetch("http://127.0.0.1:5000/next");
  };

  const previousSong = async () => {
    // Similar logic for previous song endpoint
    const response = await fetch("http://127.0.0.1:5000/previous");
  };
  const Play = async () => {
    // Similar logic for previous song endpoint
    const response = await fetch("http://127.0.0.1:5000/play");
  };

  return (
    <div className=" glass container text-center">
      <div className="row align-items-start">
        <div className="row">
          <div className= "col-3">
        <img src={songInfo.album_img} alt="album here" style={{ width: '30vh', height: '30vh', borderRadius: '8px'}} draggable="false"/>
          </div >
            <div className="col">
            <div className = "row">
              <h2>{songInfo.song}</h2>
              <h3>{songInfo.artist}</h3>

            </div>
            <div className="row-1">
              <div className="col">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-skip-backward-fill" viewBox="0 0 16 16" onClick={previousSong}>
                    <path d="M.5 3.5A.5.5 0 0 0 0 4v8a.5.5 0 0 0 1 0V8.753l6.267 3.636c.54.313 1.233-.066 1.233-.697v-2.94l6.267 3.636c.54.314 1.233-.065 1.233-.696V4.308c0-.63-.693-1.01-1.233-.696L8.5 7.248v-2.94c0-.63-.692-1.01-1.233-.696L1 7.248V4a.5.5 0 0 0-.5-.5"/>
                </svg>
              </div>
              <div className="col">
                <PausePlay />
              </div>
              <div className="col">
              <svg xmlns="http://www.w3.org/2000/svg"  onClick={nextSong} width="35" height="36" fill="currentColor" className="bi bi-skip-forward-fill" viewBox="0 0 16 16">
                  <path d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.753l-6.267 3.636c-.54.313-1.233-.066-1.233-.697v-2.94l-6.267 3.636C.693 12.703 0 12.324 0 11.693V4.308c0-.63.693-1.01 1.233-.696L7.5 7.248v-2.94c0-.63.693-1.01 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5"/>
              </svg>
              </div>
              </div>
              <div className="row">
                <h2>{songInfo.time_location}</h2>
              </div>
              </div>
            </div>
        </div>
        </div>
  );
}

export default Player;