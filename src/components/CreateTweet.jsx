import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";
import CreateTweetContext from "../contexts/CreateTweetContext";
import { useContext } from "react";


export default function CreateTweet(props) {
  const [tweet, setTweet] = useState("");
  const [disabled, setDisabled] = useState(false);
  const {addTweets, setLoader, errorFunc,seterrorMessage} = useContext(CreateTweetContext)
  


  const changeTweet = (e) => {
    setTweet(e.target.value);
    e.target.value.length > 141 ? setDisabled(true) : setDisabled(false);
  };

  const addHandler = async (e) => {
    
    e.preventDefault();
    seterrorMessage( "")
    try {
      if (tweet !== "") {
        setLoader(true);
        const PostTweet = {
          content: tweet,
          userName: props.userName,
          date: new Date().toISOString(),
        };
       const res = await axios.post(
          "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet",
          PostTweet

        );
        
        setTweet("");
        addTweets(res.data);
      }
    } catch (error) {
     errorFunc(error.message)
     setLoader(false)
    }
  };



  return (
    <>
      <form
        className="textarea-container border border-white mb-4"
        onSubmit={addHandler}
      >
        <textarea
          maxLength={142}
          type="text"
          placeholder="What's on your mind..."
          style={{ height: "100px" }}
          className=""
          value={tweet}
          onChange={changeTweet}
        />

        <div className="textarea-bottom d-flex align-items-center flex-row-reverse">
          <Button
            variant="primary"
            disabled={tweet.length > 141 ? true : false}
            type="submit"
            className="btn ms-auto"
          >
            Tweet
          </Button>
           
          <div
            className="error"
            style={{ visibility: disabled ? "visible" : "hidden" }}
          >
            {tweet.length > 141 ? "The tweets can't contain more than 140 chars." : ""}
            

          </div>

        </div>
      </form>
    </>
  );
}
