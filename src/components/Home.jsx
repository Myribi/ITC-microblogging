import "bootstrap/dist/css/bootstrap.min.css";
import CreateTweet from "./CreateTweet";
import { useState, useEffect } from "react";
import TweetList from "./TweetList";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";




function Home(props) {
    const [tweets, setTweetsList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [errorMessage, seterrorMessage] = useState("")
  
    const addTweets = (PostTweet) => {
      setTweetsList((prev) => [PostTweet, ...prev]);
      setLoader(false);
    };
  
    useEffect(() => {
        
            (async () => {
        const { data } = await axios.get(
          "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet"
        );
        setTweetsList(data.tweets);
      })();
    }, []);
  
    const errorFunc = (error) => {
      seterrorMessage(error)
    }
  
    return (
      <>

        
       
      <div className="App">
        
        <CreateTweet
          tweets={tweets}
          addTweets={addTweets}
          setLoader={setLoader}
          errorFunc= {errorFunc}
          seterrorMessage={seterrorMessage}
          userName={props.userName}
          setuserName={props.setuserName}
          
          
        />
        
        <Spinner
          id="loader"
          animation="grow"
          variant="info"
          className={loader ? "my-2" : "d-none"}
        />
        {errorMessage !== "" ?<div className="text-danger mb-2 serverError">Oh no, there's seems to be a problem! Try again in a few minutes.</div> : ""}
        <TweetList tweets={tweets} setTweetsList={setTweetsList} />
      </div>
      
      </>
    );
  }
  
  export default Home;