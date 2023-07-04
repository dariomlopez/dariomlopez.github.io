
function Tweets(tweet){
  const { id, nickName, wrote_on, content } = tweet;

  return (
    
        <div className="container">
          <p>
              <div className="tweet-ind" key={id}>
                <p>{content}</p>
                <p className="tweet-autor">
                  @{nickName} - {wrote_on}
                </p>
              </div>
          </p>
        </div>
  );
}

export default Tweets;