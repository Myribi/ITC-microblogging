import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

export default function NewUser(props) {
  const [password, setPassword] = useState("");
  const { userName, userEmail, emailChange, register, userSign, userId } =
    useUser();
  const navigate = useNavigate();

  const passwordSign = (e) => {
    setPassword(e.target.value);
  };

  const signedUp = async (e) => {
    e.preventDefault();
    await register(userName, userEmail, password);
    window.alert("You Are Successfully Signed In! Welcome " + userName);
  };

  useEffect(() => {
    if (userId) navigate("/");
  }, [navigate, userId]);

  return (
    <form className="login d-flex flex-column" onSubmit={signedUp}>
      <label>UserName: </label>
      <input type="username" name="name" className="mb-3" onChange={userSign}></input>

      <label>Email: </label>
      <input type="email" name="email" className="mb-3"  onChange={emailChange}></input>

      <label>Password: </label>
      <input type="password" name="password" className="mb-3" onChange={passwordSign}></input>

      <Button variant="primary" type="submit" className="btn ms-auto mt-4">
        Sign Up
      </Button>
    </form>
  );
}
