import { useEffect, useState } from 'react';
import axios from 'axios';
import "../../Styling/glasseffect.css"

function QueuedSong({ song }) {
    const { album_img = " ", artist_name = " ", track_name = " " } = song || {};
  
    return (
      <div className="container text-center ">
        <div className="row align-items-start">
          <div className= "col-1">
            {album_img && <img src={album_img} alt="Album Artwork" style={{borderRadius: "8px" , height: "60px"}}/>}
          </div>
          <div className="col-6 ">
            <p>{track_name} by {artist_name}</p>
          </div>
        </div>
      </div>
    );
  }

  function Queue() {
    const [songs, setSongs] = useState([]); // State variable for songs
  
    const addQueue = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/session/queue_info");
        console.log(response.data)
        setSongs(response.data); // Update songs state with retrieved data
      } catch (error) {
        console.error("Error fetching queue data:", error);
        // Handle errors appropriately, like displaying an error message
      }
    };
  
    useEffect(() => {
      const intervalId = setInterval(addQueue, 10000); // Call addQueue every 30 seconds (30000 milliseconds)
  
      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures the effect runs only once on component mount
  
    if (!songs || songs.length === 0) {
      return <p>No songs found.</p>;
    }
  
    return (
      <>
      <h3>Queue</h3>
      <div className='scroll'>
        
        {songs.map((song) => (
          <QueuedSong key={song.song_name} song={song} {...song} />
        ))}
      </div>
      </>
    );
  }

  export default Queue;