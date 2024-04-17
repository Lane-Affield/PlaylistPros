import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styling/textinput.css";

function StartForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // State to store username
  const formRef = useRef(null); // Reference to the form element

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername); // Pre-populate username from storage
    }
  }, []); // Empty dependency array to run only once on component mount

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!formRef.current) {
      console.error("Form reference not available yet!");
      return;
    }

    const enteredUsername = username; // Access username from state

    localStorage.setItem("username", enteredUsername); // Store username in storage
    fetch("http://127.0.0.1:5000/")
    navigate(`/home/${enteredUsername}`);
  };

  const swapLogInForm = () => {
    setFormType("login");
  };

  const swapSignUpForm = () => {
    setFormType("signup");
  };

  const [formType, setFormType] = useState("login"); // State for form type (login/signup)

  return (
    <div>
      <div>
        <h1>PLAYLIST PROS</h1>
        {formType === "login" ? (
          <form onSubmit={handleFormSubmit} ref={formRef}>
            <div className="container text-center">
              <div className="row">
                <label className="labels">Username</label>
                <input
                  type="text"
                  className="input_text"
                  required
                  onChange={(e) => setUsername(e.target.value)} // Update username state on change
                />
              </div>
              <div className="row">
                <label className="labels">Password</label>
                <input type="password" className="input_text" required />
              </div>
              <div className="row">
                <div className="col">
                  <button onClick={swapSignUpForm} className="glass-button">Sign Up</button>
                </div>
                <div className="col">
                  <button type="submit" className="glass-button" >Continue</button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleFormSubmit} ref={formRef}>
            <div className="container text-center">
              <div className="row">
                <label>Username</label>
                <input type="text" placeholder="Username" className="input_text" required onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="row">
                <label>Password</label>
                <input type="password" placeholder="Password" className="input_text"required />
              </div>
              <div className="row">
                <label>Confirm Password</label>
                <input type="password" placeholder="Confirm Password" className="input_text" required />
              </div>
              <div className="row">
                <div className="col">
                  <button type="button" className="glass-button" onClick={swapLogInForm}>
                    Log In
                  </button>
                </div>
                <div className="col">
                  <button type="submit" className="glass-button">
                    Continue
                  </button>
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
