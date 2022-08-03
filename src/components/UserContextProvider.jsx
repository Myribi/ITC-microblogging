import React, { useState, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { auth } from "../fireStore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  onAuthStateChanged
} from "firebase/auth";
import { setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../fireStore";


export default function UserContextProvider(props) {
  const { children } = props;
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUserId(user);
        });
    }, []);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUserId(user.uid);
        setUserEmail(user.email);
        setUserName(user.displayName);
      })
      .catch((error) => {
        const err = error.code;
        console.log(err);
        const errmessage = error.message;
        console.log(errmessage);
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

  const updateUserName = async (newName) => {
    setUserName(newName);
    try {
      await updateProfile(auth.currentUser, { displayName: newName });
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        userName: newName,
      });
    } catch (error) {
      const err = error.code;
      console.log(err);
      const errmessage = error.message;
      console.log(errmessage);
    }
  };

  const register = async (password) => {
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
    console.log(newUser);
    await updateProfile(auth.currentUser, { displayName: userName });
    console.log(userName);
  };

  const signout = () => {
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
