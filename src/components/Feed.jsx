import React, { useEffect } from 'react'
import UserCard from './UserCard'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'

const Feed = () => {

  const dispatch = useDispatch();
  const feed = useSelector(state => state.feed);

  const getFeed = async () => {

    try {
      const res = await axios.get(`${BASE_URL}/feed`, { withCredentials: true });

      dispatch(addFeed(res?.data?.data));

    } catch (error) {
      // handle error
    }

  }

  useEffect(() => {
    getFeed();
  }, [])

  return feed && (
    <div className='h-[90vh]'>
      {feed?.map((user, index) => <UserCard user={feed[index]} />)}

    </div>
  )
}

export default Feed