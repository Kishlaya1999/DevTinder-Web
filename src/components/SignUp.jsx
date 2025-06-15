import axios from 'axios';
import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [toast, setToast] = useState({ message: "", show: false });


  const handleSignUp = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/signup`, { firstName, lastName, emailId: email, password })
      if (res.status === 200) {
        setToast({ show: true, message: "User Signup Successfull" });
        // navigate("/login");
      }

      setTimeout(() => {
        setToast({ ...toast, show: false });
        navigate("/login");
      }, 3000)

    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <div className='flex flex-row min-h-[80vh] justify-center items-center'>
        <div className="card card-border bg-base-300 w-96">
          <div className="card-body">
            <h2 className="card-title self-center">SignUp</h2>
            <fieldset className="fieldset mb-4">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                className="input"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)} />
            </fieldset>
            <fieldset className="fieldset mb-4">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                className="input"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)} />
            </fieldset>
            <fieldset className="fieldset mb-4">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </fieldset>
            <p className='text-red-500'>{error}</p>
            <div className="card-actions justify-end self-center">
              <button className="btn btn-primary" onClick={handleSignUp}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
      {toast?.show && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>{toast?.message}</span>
          </div>
        </div>
      )}
    </>

  )
}

export default SignUp