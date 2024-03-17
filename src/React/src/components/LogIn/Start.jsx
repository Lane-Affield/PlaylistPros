import SignUpButton from "./SignUpButton";
import LogInButton from "./LogInButton";
function StartForm(){
    return(
        <div>
            <H1>PLAYLIST PROS</H1>
            <LogInButton />
            <h2>OR</h2>
            <SignUpButton />
        </div>);
}

export default StartForm