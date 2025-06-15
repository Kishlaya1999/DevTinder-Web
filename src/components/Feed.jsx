import React, { useEffect } from 'react'
import UserCard from './UserCard'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'

const Feed = () => {

  const dispatch = useDispatch(); // Initialize Redux dispatch function
  const feed = useSelector(state => state.feed); // Get feed data from Redux store

  // Function to fetch feed data from backend
  const getFeed = async () => {
    try {
      // Send GET request to fetch feed, include credentials for authentication
      const res = await axios.get(`${BASE_URL}/feed`, { withCredentials: true });

      // Store fetched feed data in Redux store
      dispatch(addFeed(res?.data?.data));

    } catch (error) {
      // handle error (can log or show error message)
    }
  }

  // useEffect runs getFeed once when the component mounts
  useEffect(() => {
    getFeed();
  }, [])

  return feed && (
    <div className='h-[90vh]'>
      <UserCard user={feed[0]} />
    </div>
  )
}

export default Feed