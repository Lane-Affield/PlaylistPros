import "../../Styling/glasseffect.css"
import { useNavigate } from "react-router-dom";

function SessionSelection(){

    let navigate = useNavigate();
    const routeChange = () => {
        let path = "/current_session"
        navigate(path)
    };


    return(
        <div className="container text-center">
            <div className="row">
                <div className="col glass">
                    <h3>New Session</h3>
                    <form>
                        <div>
                            <label>Session Name</label>
                            <input type="text"></input>
                        </div>
                        <div>
                            <label>Starting Song</label>
                            <input type="text"></input>
                        </div>
                        <div>
                            <label>Banned Songs</label>
                            <input type="text"></input>
                        </div>
                        <button type="submit" onClick={routeChange}>Create</button>
                    </form>
                </div>
                <div className="col-2 glass">
                <h3>Existing Sessions</h3>
                <ul>
                    <li>option 1</li>
                    <li>option 2</li>
                </ul>

                </div>
            </div>
        </div>
    );

}
export default SessionSelection;