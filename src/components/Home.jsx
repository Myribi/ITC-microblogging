import "bootstrap/dist/css/bootstrap.min.css";
import CreateTweet from "./CreateTweet";
import { useState, useEffect } from "react";
import TweetList from "./TweetList";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import CreateTweetContext from "../contexts/CreateTweetContext";



function Home(props) {
  const [tweets, setTweetsList] = useState([]);
  

  const [loader, setLoader] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [refresh, setRefresh] = useState(true);
  

  useEffect(() => {
    getTweets();
    const refreshInterval = setInterval(getTweets, 60000);
    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  const getTweets = async () => {
    setRefresh(true);
    const {data} = await axios.get(
      "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet"
    );
    setTweetsList(data.tweets);
    return {data};
  };

  const addTweets = (PostTweet) => {
    setTweetsList((prev) => [PostTweet, ...prev]);
    setLoader(false);
  };

  const errorFunc = (error) => {
    seterrorMessage(error);
  };

  return (
    <>
    <CreateTweetContext.Provider value={{tweets, setTweetsList, addTweets, setLoader, errorFunc,seterrorMessage}}>
      <div className="App">
        <CreateTweet
          userName={props.userName}
          setuserName={props.setuserName}
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
