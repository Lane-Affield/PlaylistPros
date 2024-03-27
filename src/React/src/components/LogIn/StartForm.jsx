import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
                <label>Username</label>
                <input type="text" placeholder="Username" required />
              </div>
              <div className="row">
                <label>Password</label>
                <input type="password" placeholder="Password" required />
              </div>
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
                  <button type="submit">Continue</button>
                </div>
                <div className="col">
                  <button onClick={routeChange}>Log In</button>
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
