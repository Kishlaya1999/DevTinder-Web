import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, skills, about, photoUrl, gender } = user; // Destructure user props
  const dispatch = useDispatch(); // Redux dispatch function

  // Function to handle sending a request (ignore or interested) to another user
  const handleSendRequest = async (status, toUserId) => {
    try {
      // Send POST request to backend to send a request with given status
      const res = await axios.post(`${BASE_URL}/request/send/${status}/${toUserId}`, {}, { withCredentials: true });
      // Remove the user from feed after sending request
      dispatch(removeUserFromFeed(toUserId));
    } catch (error) {
      // Error handling (can log or show error message)
    }
  }

  return (
    <div className='flex justify-center items-center h-full'>
      <div className="card bg-base-200 w-96 shadow-sm">
        <figure>
          <img
            src={photoUrl}
            alt="user image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          {age && gender && <p>{`${age}, ${gender}`}</p>}
          {about && <p>{about}</p>}
          <p>{skills?.join(", ")}</p>
          <div className="card-actions justify-center my-3">
            {/* Button to ignore the user, sends "ignored" status to backend */}
            <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>

            {/* Button to show interest in the user, sends "interested" status to backend */}
            <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard