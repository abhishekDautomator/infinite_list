import React,{useState} from 'react';
import './Login.css';

export default function Login({setIsLoggedIn}) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(username==='foo' && password==='bar') {
            console.log('Authentication successful');
            setIsLoggedIn(true);
        }
    }

    return(
      <div className="login-popup">
        <h1>Please Log In</h1>
        <form autocomplete="off" onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input type="text" placeholder="foo" onChange={e => setUserName(e.target.value)}/>
          </label>
          <label>
            <p>Password</p>
            <input type="password" placeholder="bar" onChange={e => setPassword(e.target.value)}/>
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }