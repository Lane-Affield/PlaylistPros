import { useState , useEffect } from "react";
import "../../Styling/glasseffect.css"

function SongSearch({song, track, isStartingSong }) {
    // Destructure props for cleaner access (assuming song is an object with properties)
    const { artist_name = "", album_img = "", track_name = "", song_uri = "" } = song || {}; // Handle potential undefined values
    return (
      <div className="container text-center ">
        <div className="row align-items-start">
          
          <div className="col">
            <img src={album_img} alt="Album Cover" height={64}/>  {/* Added alt text for accessibility */}
          </div>
          <div className="col">
            <p>
              {track_name} {artist_name && `by ${artist_name}`}  {/* Conditionally render artist name */}
              {isStartingSong ? (
            <button onClick={() => onSelect(song)}>Select as Starting Song</button>
          ) : (
            <button onClick={() => onSelect(song)}>Select as Banned Track</button>
          )}
            </p>
          </div>
        </div>
        </div>
    );
  };

function Results({ songs , onSelectStartSong, onSelectBannedTrack }) {
    if (!songs || songs.length === 0) {
      return <p>No songs found.</p>;
    }
    const handleSongSelection = (track, isStartingSong) => {
        if (isStartingSong) {
          onSelectStartSong(track); // Call onSelectStartSong for starting song
        } else {
          onSelectBannedTrack(track); // Call onSelectBannedTrack for banned track
        }
      };
  
    return (
      <div className="scroll">
      {songs.map((song) => (
        <SongSearch
          key={song.song_uri}
          song={song}
          onClick={() => handleSongSelection(song, true)} // Pass isStartingSong as true for starting song
          onSelectBannedTrack={() => handleSongSelection(song, false)} // Pass isStartingSong as false for banned track
        />
      ))}
      </div>
    );
  };

export default Results;