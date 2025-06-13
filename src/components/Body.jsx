import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import axios from 'axios'

const Body = () => {
	const userData = useSelector(state => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const fetchUser = async () => {
		if (userData) return;
		try {
			// Send a GET request to fetch the current user's profile from the backend.
			// The 'withCredentials: true' option ensures cookies (such as session tokens) are included.
			const res = await axios.get(`${BASE_URL}/profile/view`, { withCredentials: true });

			// Store the fetched user data in the Redux store.
			dispatch(addUser(res.data));

		} catch (error) {
			// If the user is not authenticated (HTTP 401), redirect to the login page if user tries to access the body page
			if (error.status === 401) {
				navigate("/login");
			} else {
				// Log any other errors to the console for debugging.
				console.error(error);
			}
		}
	}

	// useEffect runs fetchUser once when the component mounts.
	useEffect(() => {
		fetchUser();
	}, [])

	return (
		<>
			<Navbar />
			<Outlet />
			<Footer />
		</>
	)
}

export default Body