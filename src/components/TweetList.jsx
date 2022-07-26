

export default function TweetList(props) {
    
  return (
  <div className="d-flex flex-column align-items-center">
    {props.tweets.map((item) => (
        <div className=" card shadow mb-2 p-3" key={item.id}>
            <div className="d-flex justify-content-between mb-3 text-secondary">
    <div className="first-name">{item.userName}</div>
    <div className="date">{item.date}</div>
    </div>
    <div className="comment">{item.content}</div>
    </div>
    ))}
  </div>
  )
}
