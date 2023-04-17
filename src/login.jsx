import React from 'react';
import { useRef, useState, useEffect } from 'react';


const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState('');

    // useEffect(() => {
    //     userRef.current.focus();
    // }, [])
    
    useEffect(() => {
        setErrMsg('');
    }, [user, password])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(true); 
    }

  return (
      <section>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username:</label>
              <input
                  type="text"
                  id="username"
                  ref={userRef}
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
          />
          
              <label htmlFor="password">Password:</label>
              <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
              />
              <button>Sign In</button>
          </form>
          <p>
              Forgot Password?<br />
              <span className="line">
                  <a href="#">Type Recovery Email</a>
              </span>
          </p>
      </section>
  )
}

export default Login