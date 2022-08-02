import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import useUser from "../hooks/useUser";

export default function Profile(props) {
  const [input, setInput] = useState("");
  const {setUserName } = useUser();

  function changeInput(e) {
    setInput(e.target.value);
  }

function changeUserName () {
  setUserName(input)
}

  return (
    <div className="profile">
      <h1 className=" title text-white">Profile</h1>
      <div className="text-white">User Name</div>
      <div className="saveBtn d-flex flex-column w-100">
        <input className="profile-input" maxLength={20} defaultValue={props.userName} onChange={changeInput}></input>

        <div className="saveBtn">
          <Button
            onClick={changeUserName}
            variant="primary"
            type="submit"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
