import logo from './components/logo.png';
import './App.css';
import tweets from "./components/ejemplo.json"
import Tweets from './components/tweets';
import User from "./components/user"
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import {
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  RedirectToSignIn,
} from "@clerk/clerk-react";



export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={
              <>
              <SignedIn>
                <Home />
              </SignedIn>
              <SignedOut>
              <div>
                <h2>Bienvenido a la aplicación</h2>
                <p>Por favor, inicia sesión para continuar.</p>
    {/* Opcional: Agregar un botón o enlace para iniciar sesión */}
                <Link to="/login">Iniciar sesión</Link>
              </div>
                <RedirectToSignIn/>
              </SignedOut>

            </>
            } />
            <Route className="User" path="user" element={<User />} />
            <Route path="dashboard" element={<Dashboard />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      {/* <main className="main">
        
        <h2>
          Ültimos tweets
        </h2>
        <div className="container">
          
            {tweets.map(({id, nickName, wrote_on, content})=>(
              <Tweets className="tweet-ind" key={id} nickName={nickName} wrote_on={wrote_on} content={content}>
                {content}
              </Tweets>
            ))}
        </div>
      </main> */}
      
    </div>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav className="navBar">
        <h1 className='navbar-title'>
          Parrotweets
        </h1>
        <img src={logo} className="App-logo" alt="logo" />
        <ul className='navUl'>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/user">User</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
          <UserButton/>
          </li>
        </ul>

      </nav>

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      
      <Outlet />

    </div>
  );
}

function Home() {
  return (
    <div>
      <main className="main">
        
        <h2>
          Ültimos tweets
        </h2>
        <div className="container">
          
            {tweets.map(({id, nickName, wrote_on, content})=>(
              <Tweets className="tweet-ind" key={id} nickName={nickName} wrote_on={wrote_on} content={content}>
                {content}
              </Tweets>
            ))}
        </div>
      </main>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function Login() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/login"></Link>
      </p>
    </div>
  );
}
