import React, { useState } from "react";
import UserContext from "../contexts/UserContext";
import { auth } from "../fireStore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInWithRedirect,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../fireStore";

export default function UserContextProvider(props) {
  const { children } = props;
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user)
        setUserId(user.uid)
        setUserEmail(user.email)
        setUserName(user.displayName)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const login = async (userEmail, passwordLog) => {
    try {
      await signInWithEmailAndPassword(auth, userEmail, passwordLog);
      setUserId(auth.currentUser.uid);
      setUserEmail(auth.currentUser.email);
      setUserName(auth.currentUser.displayName);
    } catch (error) {
      const err = error.code;
      console.log(err);
      const errmessage = error.message;
      console.log(errmessage);
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

  const register = async (password) => {
    console.log(userEmail);
    const data = await createUserWithEmailAndPassword(
      auth,
      userEmail,
      password
    );
    const newUser = {
      email: data.user.email,
      userName,
      profilePic: data.user.photoURL,
    };
    await setDoc(doc(db, "users", data.user.uid), newUser);

    // await updateProfile(auth.currentUser, {displayName: userName})
  };

  const signout = () => {
    console.log("plop")
    signOut(auth);
    setUserId("");
  };

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
        setUserName,
        signInWithGoogle,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
