
function Tweets(tweet){
  const { id, nickName, wrote_on, content } = tweet;

  return (
    
  <div className="container">
    <div>
        <div className="tweet-ind" key={id}>
          <p>{content}</p>
          <p className="tweet-autor">
          #{nickName} - {wrote_on}
          </p>
        </div>
    </div>
  </div>
  );
}

export default Tweets;