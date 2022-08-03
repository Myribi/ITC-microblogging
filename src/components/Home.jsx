import "bootstrap/dist/css/bootstrap.min.css";
import CreateTweet from "./CreateTweet";
import { useState, useEffect } from "react";
import TweetList from "./TweetList";
import Spinner from "react-bootstrap/Spinner";
import CreateTweetContext from "../contexts/CreateTweetContext";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../fireStore";
import useUser from "../hooks/useUser";
import { onAuthStateChanged } from "firebase/auth";

function Home(props) {
  const [tweets, setTweetsList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  
  const { userName, setUserName } = useUser();

  useEffect(() => {
    const colRef = collection(db, "tweet");
    const q = query(colRef, orderBy("date", "desc"), limit(10));

    onSnapshot(q, async (snapshot) => {
      const list = await Promise.all(
        snapshot?.docs.map(async (document) => {
          const tweetData = document.data();
          const user = await getDoc(doc(db, "users", tweetData.id));
          const userData = user?.data();
          console.log(userData)
          return {
            ...document.data(),
            id: document.id,
            userName: userData ? userData.userName : "",
            profilePic: (userData.profilePic === null) ? "https://cdn.shopify.com/s/files/1/1061/1924/products/Sunglasses_Emoji_be26cc0a-eef9-49e5-8da2-169bb417cc0b_large.png?v=1571606036" :userData.profilePic 
          };
        })
      );
      setTweetsList(list);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser){
        const current = await getDoc(doc(db, "users", auth.currentUser.uid));
        const currentData = current.data();
        if (!currentData) {
          await setDoc(doc(db, "users", auth.currentUser.uid), {
            userName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            profilePic: auth.currentUser.photoURL,
          });
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const addTweets = (PostTweet) => {
    setTweetsList((prev) => [PostTweet, ...prev]);

    setLoader(false);
  };

  const errorFunc = (error) => {
    seterrorMessage(error);
  };

  return (
    <>
      <CreateTweetContext.Provider
        value={{
          tweets,
          setTweetsList,
          addTweets,
          setLoader,
          errorFunc,
          seterrorMessage,
        }}
      >
        <div className="App">
          <CreateTweet userName={userName} setuserName={setUserName} />

          <Spinner
            id="loader"
            animation="grow"
            variant="info"
            className={loader ? "my-2" : "d-none"}
          />
          {errorMessage !== "" ? (
            <div className="text-danger mb-2 serverError">
              Oh no, there's seems to be a problem! Try again in a few minutes.
            </div>
          ) : (
            ""
          )}
          <TweetList />
        </div>
      </CreateTweetContext.Provider>
    </>
  );
}

export default Home;
