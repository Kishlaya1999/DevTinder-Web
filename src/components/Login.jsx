import axios from 'axios';
import React, { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // The following line sends a POST request to the backend login endpoint using axios.
    // It sends an object with the user's email and password as the request body.
    // The 'withCredentials: true' option ensures that cookies (such as session tokens) are included in the request.
    // The response from the server is stored in the 'res' variable for further processing (e.g., logging in the user).
    const res = await axios.post(
      "http://localhost:3000/login",           // Backend login endpoint
      { emailId: email, password },            // Request body: user's email and password
      { withCredentials: true }                // Include credentials (cookies) in the request
    );
    console.log(res);

  }

  return (
    // <div className='h-full'>
    <div className='flex flex-row min-h-[80vh] justify-center items-center'>
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title self-center">Login</h2>
          <fieldset className="fieldset mb-4">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="email"
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </fieldset>
          <fieldset className="fieldset my-4">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="text"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </fieldset>
          <div className="card-actions justify-end self-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
    // </div>

  )
}

export default Login