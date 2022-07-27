import Button from "react-bootstrap/Button";
import React, { useState } from "react";

export default function Profile(props) {
  const [input, setInput] = useState("");

  function changeInput(e) {
    setInput(e.target.value);
  }

function changeUserName () {
  props.setuserName(input)
}

  return (
    <div className="profile">
      <h1 className=" title text-white">Profile</h1>
      <div className="text-white">User Name</div>
      <div className="saveBtn d-flex flex-column w-100">
        <input className="profile-input" defaultValue={props.userName} onChange={changeInput}></input>

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
