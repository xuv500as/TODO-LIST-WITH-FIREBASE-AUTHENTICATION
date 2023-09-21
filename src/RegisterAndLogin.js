import React, { useState } from "react";
import { database } from "./FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import './RegisterAndLogin.css'

function RegisterAndLogin() {
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (login) {
        // Sign In
        await signInWithEmailAndPassword(database,email, password);
      } else {
        // Sign Up
        await createUserWithEmailAndPassword(database,email, password);
      }
      history("/home");
    } catch (err) {
      alert(err.code);
    }
  };

  const handleReset = () => {
    history("/reset");
  };

  return (
    <div className="App">
      <div className="row">
        <div className="SignUp" onClick={() => setLogin(false)}>
          SignUp
        </div>
        <div className="SignIn" onClick={() => setLogin(true)}>
          SignIn
        </div>
      </div>
      <h1 className="head1">{login ? "SignIn" : "SignUp"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="email"
        />
        <br />
        <input className="password" name="password" type="password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <br />
        <p className="forgot" onClick={handleReset}>Forgot Password?</p>
        <br />
        <button className="submit "type="submit">{login ? "SignIn" : "SignUp"}</button>
      </form>
    </div>
  );
}

export default RegisterAndLogin;
