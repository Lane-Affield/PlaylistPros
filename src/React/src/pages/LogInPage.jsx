import StartForm from "../components/LogIn/StartForm";
import Logo from "../components/Logo/Logo";
import "../Styling/glasseffect.css"

function LogInPage(){
 return(
    <div className="container-fluid">
    <div className="container text-center ">
        <div className="row align-items-start">
            <div className="col">
                <Logo></Logo>
            </div>
            <div className="col glass">
                <StartForm />
            </div>
        </div>
    </div>
    </div>

 );
}
export default LogInPage;