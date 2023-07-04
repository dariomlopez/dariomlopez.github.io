import logo from './img/logo.png';
import './App.css';
import tweets from "./json/ejemplo.json"


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
            {tweets.map(({nickName, writed_on, content})=>(
              <div className="tweet-ind" key={tweets.id}>
                <p>{content}</p>
                <p className="tweet-autor">
                  @{nickName} - {writed_on}
                </p>
              </div>
            ))}
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
