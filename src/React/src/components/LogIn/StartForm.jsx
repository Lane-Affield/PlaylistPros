import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styling/textinput.css"
function StartForm() {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = "/home"
        navigate(path)
    }

  const [formType, setFormType] = useState("login");

  const swapLogInForm = () => {
    setFormType("login");
  };

  const swapSignUpForm = () => {
    setFormType("signup");
  };

  return (
    <div>
      <div>
        <h1>PLAYLIST PROS</h1>
        {formType === "login" ? (
          <form onSubmit={routeChange}>
            <div className="container text-center">
              <div className="row">
                <label className="labels">Username</label>
                <input type="text" className="input_text" required />
              </div>
              <div className="row">
                <label className="labels">Password</label>
                <input type="password" className="input_text"required /></div>
              </div>
              <div className="row">
                <div className="col">
                  <button onClick={swapSignUpForm}>Sign Up</button>
                </div>
                <div className="col">
                  <button type="submit">Continue</button>
                </div>
              </div>
          </form>
        ) : (
          <form onSubmit="#">
            <div className="container text-center">
              <div className="row">
                <label>Username</label>
                <input type="text" placeholder="Username" required />
              </div>
              <div className="row">
                <label>Password</label>
                <input type="password" placeholder="Password" required />
              </div>
              <div className="row">
                <label>Confirm Password</label>
                <input type="password" placeholder="Confirm Password" required />
              </div>
              <div className="row">
                <div className="col">
                  <button type="submit">Log In</button>
                </div>
                <div className="col">
                  <button onClick={routeChange} className="glass-button">Continue</button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default StartForm;
