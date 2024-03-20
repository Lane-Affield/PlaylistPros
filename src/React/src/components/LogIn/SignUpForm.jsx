import LogInButton from "./LogInButton";
function SignUpForm(){
    return(
        <div>
            <form>
                <label className="form-label">Username</label>
                <input type="text" className="form-control"></input>
                <label className="form-label">Password</label>
                <input type="text" className="form-control"></input>
                <button type="submit" className="btn btn-secondary">Continue</button>
                <SignUpButton></SignUpButton>
            </form>
        </div>
    );
}

export default SignUpForm;