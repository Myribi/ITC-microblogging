import Button from "react-bootstrap/Button";
import { useState } from "react";
import CreateTweetContext from "../contexts/CreateTweetContext";
import { useContext } from "react";
import { collection, addDoc} from "firebase/firestore"; 
import {db,auth} from "../fireStore";
import useUser from "../hooks/useUser";

export default function CreateTweet() {
  const [tweet, setTweet] = useState("");
  const [disabled, setDisabled] = useState(false);
  const {setLoader, errorFunc,seterrorMessage} = useContext(CreateTweetContext)
  const {userId, userName} = useUser();
  


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
          // userName: userName,
          date: new Date().toISOString(),
          id: userId.uid ? userId.uid : auth.currentUser.uid
         
        }
        console.log(userId.uid)
        console.log("auth", auth)
        await addDoc(collection(db, "tweet"),PostTweet );
        setTweet("");
        setLoader(false);
      }
    } catch (error) {
      console.log(error)
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
          placeholder={"Hey" + " " + userName + " " + "what's on your mind today..."}
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
