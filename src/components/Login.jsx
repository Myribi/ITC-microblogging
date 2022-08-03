
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

export default function Login() {
  const { login, userId, userEmail, emailChange, signInWithGoogle } = useUser();
  const [passwordLog, setPasswordLog] = useState("");
  const navigate = useNavigate();

  const passwordChange = (e) => {
    setPasswordLog(e.target.value);
  };

  const loggedIn = (e) => {
    e.preventDefault();
    login(userEmail, passwordLog);
  };

  const googleLog = async (e) => {
    e.preventDefault();
    try {
      signInWithGoogle();
    } catch (error) {
      console.log("plop", error);
    }
  };

  useEffect(() => {
    if (userId) navigate("/");
  }, [navigate, userId]);

  return (
    <>
      <div className="d-flex justify-content-center title">
        <h1>Login</h1>
      </div>
      <form className="login d-flex flex-column " onSubmit={loggedIn}>
        <label>Email: </label>
        <input
          type="email"
          name="email"
          className="mb-3"
          onChange={emailChange}
        ></input>
        <label>Password: </label>
        <input
          type="password"
          name="password"
          onChange={passwordChange}
          className="mb-3"
        ></input>
        <div className="d-flex align-items-center">
        <Button variant="primary" type="submit" className="btn ms-auto mt-4">
          Login
        </Button>
        </div>
        
      </form>
      <div className="d-flex justify-content-center align-items-center mt-4 ">
        <div className="text-white Or">Don't have an acount yet? <Link className="Sign" to="/newuser">Sign Up </Link> Or </div>
      <Button
          variant="primary"
          onClick={googleLog}
          className="btn d-flex align-items-center justify-content-center"
        >
          <img
            alt = "logo"
            src="https://developers.google.com/identity/images/g-logo.png"
            className="logoGoog"
          ></img>
          Sign in with google{" "}
        </Button>
      </div>
    </>
  );
}
