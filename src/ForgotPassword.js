import { database } from "./FirebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './ForgotPassword.css'


function ForgotPassword() {
  const [email, setEmail] = useState("");
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(database, email);
      alert("Check your email for password reset instructions.");
      history("/");
    } catch (err) {
      alert(err.code);
    }
  };

  return (
    <div className="App">
      <h1 className="forgot">Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <input className="forgotInput"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <br/><br/>
        <button className="submit" type="submit">Reset</button>
      </form>
    </div>
  );
}

export default ForgotPassword;