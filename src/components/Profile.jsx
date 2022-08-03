import { Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import useUser from "../hooks/useUser";
import { auth, uploadPhoto, setUserDoc } from "../fireStore";

export default function Profile() {
  const { user, profileUrl } = useUser();
  const [input, setInput] = useState("");
  const [profileImage, setProfileImage] = useState();
  const { updateUserName } = useUser();

  function changeInput(e) {
    setInput(e.target.value);
  }

  const changePhoto = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const profileUserName = async (e) => {
    e.preventDefault();
    if (profileImage) {
      const profileUrl = await uploadPhoto(profileImage, auth);
      setUserDoc(auth.currentUser.uid, {
        profilePic: profileUrl,
      });
      setProfileImage(profileUrl);
    }
    if (input) {
      updateUserName(input);
    }

    window.alert("Your Profil was successfully updated!!");
    setInput("");
  };



  return (
    <div className="profile">
      <h1 className=" title text-white">Profile</h1>
     { profileImage && (<div>
        <img src={profileImage} style={{ height: 100 }} />
      </div>)}
      <Form.Control type="file" onChange={changePhoto} />
      <div className="text-white">User Name</div>
      <div className="saveBtn d-flex flex-column w-100">
        <input
          className="profile-input"
          maxLength={20}
          value={input}
          onChange={changeInput}
        ></input>

        <div className="saveBtn">
          <Button onClick={profileUserName} variant="primary" type="submit">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
