import logo from './components/logo.png';
import './App.css';
import tweets from "./components/ejemplo.json"
import Tweets from './components/tweets';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Parrot that tweets
        </h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main className="App-header">
        <h2>
          Ültimos tweets
        </h2>
        <div className="container">
          <p>
            {tweets.map(({id, nickName, wrote_on, content})=>(
              <Tweets className="tweet-ind" key={id} nickName={nickName} wrote_on={wrote_on} content={content}>
                <p>{content}</p>
              </Tweets>
            ))}
          </p>
        </div>
      </main>
      
    </div>
  );
}

export default App;
