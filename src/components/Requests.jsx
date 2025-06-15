import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestsSlice';

const Requests = () => {

  const dispatch = useDispatch(); // Redux dispatch function
  const recievedReq = useSelector(state => state.requests); // Get received requests from Redux store

  // Function to handle accepting or rejecting a request
  const handleRequest = async (status, requestId) => {
    try {
      // Send POST request to backend to review (accept/reject) the request
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      // Remove the request from Redux store after action
      dispatch(removeRequest(requestId));
    } catch (error) {
      // error handling (can log or show error message)
    }
  }

  // Function to fetch all received requests from backend
  const fetchRequests = async () => {
    try {
      // Send GET request to fetch received requests, include credentials for authentication
      const res = await axios.get(`${BASE_URL}/user/requests/recieved`, { withCredentials: true });
      // Store fetched requests in Redux store
      dispatch(addRequests(res?.data?.data));
    } catch (error) {
      // Error handling (can log or show error message)
    }
  }

  // useEffect runs fetchRequests once when the component mounts
  useEffect(() => {
    fetchRequests();
  }, [])

  // If requests are undefined, render nothing (can show loader here)
  if (recievedReq == undefined) return;

  // If there are no requests, show a message
  if (recievedReq.length == 0) return <h1 className='text-center py-56'>No request found</h1>

  return (
    <div className='flex items-center flex-col'>
      <h1 className='text-3xl font-semibold py-4'>Requests</h1>
      {/* Map through each request and display user info with Accept/Reject buttons */}
      {recievedReq?.map((request) => {
        const { firstName, lastName, about, age, gender, photoUrl } = request.fromUserId;

        return (
          <div className='flex items-center w-1/2 bg-base-300 border-1 rounded-2xl h-28 my-5'>
            <div>
              <img className='rounded-full w-20 h-20 mx-3' src={photoUrl} alt="" />
            </div>
            <div className='flex justify-between items-center w-full p-3'>
              <div className='flex-1'>
                <p>{`${firstName} ${lastName}`}</p>
                {age && gender && <p className='text-sm text-gray-400'>{`${age}, ${gender}`}</p>}
                {about && <p className='text-sm text-gray-400'>{about}</p>}
              </div>
              <div>
                {/* Reject and Accept buttons */}
                <button className="btn btn-primary mx-2" onClick={() => handleRequest("rejected", request?._id)}>Reject</button>
                <button className="btn btn-secondary" onClick={() => handleRequest("accepted", request?._id)}>Accept</button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Requests