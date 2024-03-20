import SignUpButton from "./SignUpButton";
import LogInButton from "./LogInButton";
import Logo from "../Logo/Logo";
function StartForm(){
    return(
        <div>
            <div>
                <h1>PLAYLIST PROS</h1>
                <LogInButton></LogInButton>
                <h2>OR</h2>
                <SignUpButton></SignUpButton>
            </div>
        </div>
    );
}

export default StartForm;