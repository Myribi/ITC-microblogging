import "bootstrap/dist/css/bootstrap.min.css";
import CreateTweet from "./CreateTweet";
import { useState, useEffect } from "react";
import TweetList from "./TweetList";
import Spinner from "react-bootstrap/Spinner";
import CreateTweetContext from "../contexts/CreateTweetContext";
import { collection, onSnapshot, query, orderBy, limit, getDoc, doc } from "firebase/firestore";
import {db }from "../fireStore";
import useUser from "../hooks/useUser";

function Home(props) {
  const [tweets, setTweetsList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const colRef = collection(db, "tweet");
  const q = query(colRef, orderBy("date", "desc"),limit(10))
  const {userName, setUserName} = useUser();

  useEffect(() => {
    onSnapshot(q, async(snapshot) => {
      const list =  await Promise.all(snapshot?.docs.map(async(document) => {
        const tweetData = document.data()
        const user = await getDoc(doc(db,"users",tweetData.id))
        const userData = user?.data()
        return({ ...document.data(), id: document.id , userName:userData ? userData.userName : ""});
      }))
      setTweetsList(list);
    });
  },[]);

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
          <CreateTweet
            userName={userName}
            setuserName={setUserName}
          />

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
