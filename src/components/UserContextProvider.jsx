import React, { useState } from "react";
import UserContext from "../contexts/UserContext";
import { auth } from "../fireStore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, updateProfile,
} from "firebase/auth";

export default function UserContextProvider(props) {
  const { children } = props;
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  

  const login = async ( userEmail, passwordLog) => {
    try {
    await signInWithEmailAndPassword(auth, userEmail,passwordLog ) 
    setUserId(auth.currentUser.uid);
    setUserEmail(auth.currentUser.email);
    setUserName(auth.currentUser.displayName);
    } catch (error) {
     const err = error.code
     console.log(err)
     const errmessage = error.message
     console.log(errmessage)
    }
  };

  const emailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const userSign = (e) => {
    setUserName(e.target.value);
  };

  const updateUserName = (newName) => {
    setUserName(newName);
  };

  const register = async (userName, userEmail, password) => {
    
    await createUserWithEmailAndPassword(auth, userEmail, password)
    setUserName("")
    await updateProfile(auth.currentUser, {displayName: userName})
    login(userEmail, password)
    
  };

  const signout = async () => {};
  return (
    <UserContext.Provider
      value={{
        login,
        register,
        signout,
        userId,
        userName,
        userEmail,
        updateUserName,
        emailChange,
        userSign,
        setUserName
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
