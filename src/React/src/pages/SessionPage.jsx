import NavBar from "../components/Home/NavBar";
import CreateSession from "../components/SessionSelector/CreateSession";
import SessionSelection from "../components/SessionSelector/SessionSelection";

function SessionPage(){
    return(
        <div>
            <NavBar />
            <CreateSession />
        </div>
    );
};

export default SessionPage;