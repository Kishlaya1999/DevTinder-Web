import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionsSlice'
import {Link} from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch(); // Initialize Redux dispatch function
  const connections = useSelector(state => state.connections); // Get connections from Redux store

  // Function to fetch user connections from backend
  const fetchConnections = async () => {
    try {
      // Send GET request to fetch connections, include credentials for authentication
      const res = await axios.get(`${BASE_URL}/user/connections`, { withCredentials: true });
      // Store fetched connections in Redux store
      dispatch(addConnections(res.data.data));
    } catch (error) {
      // Error handling (can log or show error message)
    }
  }

  // useEffect runs fetchConnections once when the component mounts
  useEffect(() => {
    fetchConnections();
  }, [])

  // If connections are undefined, render nothing (can show loader here)
  if (connections == undefined) return;

  // If there are no connections, show a message
  if (connections.length == 0) return <h1 className='text-center py-56'>No connections found</h1>

  return (
    <div className='flex items-center flex-col'>
      <h1 className='text-3xl font-semibold py-4'>Connections</h1>
      {connections.map(connection => {
        const { _id ,firstName, lastName, age, gender, about, photoUrl } = connection;
        return (
          <div className='flex items-center w-1/2 bg-base-300 border-1 rounded-2xl h-28 my-5 shadow-2xl'>
            <div>
              <img className='rounded-full w-20 h-20 mx-3' src={photoUrl} alt="" />
            </div>
            <div className='flex justify-between items-center w-2/3 p-3'>
              <div className='flex-1'>
                <p>{`${firstName} ${lastName}`}</p>
                {age && gender && <p className='text-sm text-gray-400'>{`${age}, ${gender}`}</p>}
                {about && <p className='text-sm text-gray-400'>{about}</p>}
              </div>
              <Link to={"/chat/" + _id}>
                <button className="btn btn-primary">Chat</button>
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Connections