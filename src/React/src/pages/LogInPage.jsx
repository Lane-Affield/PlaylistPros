import StartForm from "../components/LogIn/StartForm";
import Logo from "../components/Logo/Logo";

function LogInPage(){
 return(
    <div className="container text-center">
        <div className="row align-items-start">
            <div className="col">
                <Logo></Logo>
            </div>
            <div className="col">
                <StartForm />
            </div>
        </div>
    </div>

 );
}
export default LogInPage;