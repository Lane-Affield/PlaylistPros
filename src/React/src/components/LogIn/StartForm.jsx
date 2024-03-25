import React,{useState} from "react";

function StartForm() {

    const [formType, setFormType] = useState("login");

    const swapLogInForm = () => {
        setFormType("login");

    };
    
    const swapSignUpForm = () =>{
        setFormType("signup");
    };


    return (
        <div>
        <div>
            
        </div>
        <div>
            <h1>PLAYLIST PROS</h1>
            {formType === "login" ?
            (
            <form>
                <div className="container text-center">
                        <div className="row">
                            <label>Username</label>
                            <input type="text"></input>
                        </div>
                        <div className="row">
                            <label>Password</label>
                            <input type="password" placeholder="********"></input></div>
                        <div className="row">
                            <div className="col">
                                <button onClick={swapSignUpForm}>Sign Up</button>
                            </div>
                            <div className="col">
                                <button type="submit">Continue</button>
                            </div>
                        </div>
                </div>
            </form>
            ) : (
                <form>
                    <div className="container text-center">
                        <div className="row">
                            <label>Username</label>
                            <input type="text" placeholder="Username"></input>
                        </div>
                        <div className="row">
                            <label style={{alignContent: "end"}}>Username</label>
                            <input type="password" placeholder="Password"></input>
                        </div>
                        <div className="row">
                            <label>Confirm Password</label>
                            <input type="password" placeholder="confirm password"></input>
                        </div>
                        <div className="row">
                            <div className="col"><button type ="submit">continue</button></div>
                            <div className="col"><button onClick={swapLogInForm}>Log In</button></div>
                        </div>
                    </div>
                </form>
            )}
        </div>
        </div>
    );
};

export default StartForm;
