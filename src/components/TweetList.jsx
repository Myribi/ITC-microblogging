import CreateTweetContext from "../contexts/CreateTweetContext";
import { useContext } from "react";

export default function TweetList() {
  const { tweets } = useContext(CreateTweetContext);

  return (
    <div className="d-flex flex-column align-items-center">
      {tweets.map((item) => (
        <div className=" card shadow mb-2 p-3" key={item.id}>
          <div className="d-flex mb-3 align-items-center text-secondary">
            <img  className="avatar" src={item.profilePic} />
            <div className="first-name ms-3">{item.userName}</div>
            <div className="date ms-auto ">{item.date}</div>
          </div>
          <div className="comment">{item.content}</div>
        </div>
      ))}
    </div>
  );
}
