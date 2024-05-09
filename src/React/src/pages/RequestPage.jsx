import { useParams } from "react-router-dom";
import SongController from "../components/Request/SongController";
import "../Styling/glasseffect.css"
import "../Styling/requests.css"
function CurrentSessionPage(){
    let {sessioncode} = useParams()
    return(
        <>
       <div className="container text-center ">
            <div className="row align-items-start">
            <h2>CODE TO QUEUE: {sessioncode}</h2>
                <div className="req-col">
                    <SongController />
                </div>

            </div>
        </div>
       </>
    );
}

export default CurrentSessionPage;