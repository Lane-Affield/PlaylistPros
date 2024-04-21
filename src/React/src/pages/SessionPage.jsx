import NavBar from "../components/Home/NavBar";
import CreateSession from "../components/SessionSelector/Search";
import SessionSelection from "../components/SessionSelector/SessionSelection";

function SessionPage(){
    return(
        <div>
            <NavBar />
            <SessionSelection />
        </div>
    );
};

export default SessionPage;