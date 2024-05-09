import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../../Styling/glasseffect.css"
import "../../Styling/textinput.css"
function SessionSelection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [startSong, setStartSong] = useState(""); // State to store the start song
  const [bannedTracks, setBannedTracks] = useState([]);
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`http://127.0.0.1:5000/search_song/${searchTerm}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  const handleAddToBannedTracks = (track) => {
    setBannedTracks([...bannedTracks, track]);
  };

  const handleSetStartSong = (trackName) => {
    setStartSong(trackName); // Set the selected track as the start song
  };

  const handleSessionCreation = (event) => {
    event.preventDefault();
    const storedUsername = localStorage.getItem("username");
    const bannedSongURIs = bannedTracks.map((track) => track.song_uri).join(","); // Convert song URIs to comma-separated string
    console.log("Banned Song URIs:", bannedSongURIs)
    let path = "/current_session/" + storedUsername + "/" + randomNum;
    fetch("http://127.0.0.1:5000/session_setup/" + randomNum + "/" +  startSong.song_uri + "/" + bannedSongURIs)
    navigate(path);
  };

  // const randomNum = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  

  let navigate = useNavigate();

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-8 glass">
          <h3>New Session</h3>
          <form onSubmit={handleSearch}>
            <div>
              <label>Search Song</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className= "input_text"
              />
              <button type="submit" className="glass-button">Search</button>
            </div>
          </form>
          {searchResults.length > 0 && (
            <div>
              <h4>Search Results</h4>
              <div className="scroll" style={{maxHeight: "300px"}}>
                {searchResults.map((track) => (
                  <SongSearch
                    key={track.song_uri}
                    track={track}
                    onSetStartSong={handleSetStartSong} // Pass function to set start song
                    onAddToBannedTracks={handleAddToBannedTracks} // Pass function to add to banned tracks
                  />
                ))}
              </div>
            </div>
          )}
          <form onSubmit={handleSessionCreation}>
            <h4>{randomNum}</h4>
            <button type="submit" className="glass-button">Create</button>
          </form>
        </div>
        <div className="col-4">
          <div className="row glass">
            <h3>Start Song</h3>
            <div className="col-1"> 
            <img src={startSong.album_img} alt="Album Cover" style={{borderRadius: "10px", height: "64px", width:"64px"}}></img>
            </div>
            <div className="col-9">
            <p>{startSong.track_name} by {startSong.artist_name}</p> {/* Display current start song */}
            </div>
          </div>
          <div className="row glass">

            <h3>Banned Tracks</h3>
            <ul className="scroll" style={{maxHeight: "300px"}}>
              {bannedTracks.map((track, index) => (
                <div key={index} className="row">
                  <div className="col-1">
                  <img src={track.album_img} alt="Album Cover" height={64} style={{borderRadius: "8px"}}/>
                  </div>
                  <div className="col-10">
                  {track.track_name} by {track.artist_name}
                  </div>

                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function SongSearch({ track, onSetStartSong, onAddToBannedTracks }) {
  const { artist_name = "", album_img = "", track_name = "" } = track || {};

  const handleStartSong = () => {
    onSetStartSong(track); // Pass the track name to onSetStartSong
  };

  const handleBanSong = () => {
    onAddToBannedTracks(track);
  };

  return (
    <div className="container text-center">
      <div className="row align-items-start">
        <div className="col">
          <img src={album_img} alt="Album Cover" height={64} style={{borderRadius: "8px"}} />
        </div>
        <div className="col">
          <p>{track_name} {artist_name && `by ${artist_name}`}</p>
          <button onClick={handleStartSong} className="glass-button">Start Song</button>
          <button onClick={handleBanSong} className="glass-button">Ban Song</button>
        </div>
      </div>
    </div>
  );
}

export default SessionSelection;
