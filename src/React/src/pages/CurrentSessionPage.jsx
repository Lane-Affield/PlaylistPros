import NavBar from "../components/Home/NavBar";
import Player from "../components/Session/Player";
import Queue from "../components/Session/Queue";
import SongController from "../components/Session/SongController";
function CurrentSessionPage(){
    return(
        <>
       <NavBar></NavBar>
       <div className="container text-center ">
            <div className="row align-items-start">
                <div className="col">
                    <Player />
                    <SongController />
                </div>
                <div className="col">
                    <h2>CODE TO Submit: 1234</h2>
                    <Queue></Queue>
                </div>

            </div>
        </div>
       </>
    );
}

export default CurrentSessionPage;