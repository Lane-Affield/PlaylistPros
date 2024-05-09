import { useParams } from "react-router-dom";
import NavBar from "../components/Home/NavBar";
import Player from "../components/Session/Player";
import Queue from "../components/Session/Queue";
import SongController from "../components/Session/SongController";
import "../Styling/glasseffect.css"
function CurrentSessionPage(){
    let {sessioncode} = useParams()
    return(
        <>
       <NavBar></NavBar>
       <div className="container text-center ">
            <div className="row align-items-start">
            <h2>CODE TO QUEUE: {sessioncode}</h2>
                <div className="col-7 ">
                    <Player />
                    <SongController />
                </div>
                <div className=" glass col-4">
                    <Queue></Queue>
                </div>

            </div>
        </div>
       </>
    );
}

export default CurrentSessionPage;