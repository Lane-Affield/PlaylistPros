import { useState } from "react";

function Player(){

    const CurrSongData = () => {
        const [songData, setSongData] = useState(null);
    }

    const Pause = () => {
        fetch("http://127.0.0.1:5000/pause")
    }
    const Next = () => {
        fetch("http://127.0.0.1:5000/next")
    }
    const Previous=  () => {
        fetch("http://127.0.0.1:5000/previous")
    }
    const CurrentSongData = async() => {
        const response = await fetch("http://127.0.0.1:5000/song_info")
        
        const songData = await response.json
        
    }

    return(
        <div className="container text-center ">
            <div className="row align-items-start">
                <div className="row">
                    <div className ="col"> 
                        <button onClick={Previous}>Back</button>
                    </div>
                    <div className ="col">
                        <button onClick={Pause}>Pause</button>
                    </div>
                    <div className ="col">
                        <button onClick={Next}>Skip</button>
                    </div>

                </div>
                <div className="row">
                    <img></img>
                    <h2> Song name Here</h2>
                    <h3>Artist name Here</h3>
                    
                </div>
            </div>
        </div>
    );
}
export default Player;