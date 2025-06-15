import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';

const Navbar = () => {

	const user = useSelector((state) => state.user); // Get current user from Redux store
	const dispatch = useDispatch(); // Redux dispatch function
	const navigate = useNavigate(); // React Router navigation

	// Function to handle user logout
	const handleLogout = () => {
		try {
			// Send POST request to backend to logout user, include credentials for authentication
			axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });

			// Remove user from Redux store
			dispatch(removeUser());
			// Redirect to login page
			navigate("/login");

		} catch (error) {
			// Log any errors to the console
			console.error(error.message);

		}
	}

	return (
		<div className="navbar bg-base-300 shadow-sm">
			<div className="flex-1">
				{/* Logo/Home link */}
				<Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
			</div>
			{/* If user is logged in, show user info and dropdown menu */}
			{user && <div className="flex gap-2 items-center">
				<p>Welcome, {user?.firstName}</p>
				<div className="dropdown dropdown-end mx-5">
					<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
						<div className="w-10 rounded-full">
							<img
								alt="Tailwind CSS Navbar component"
								src={user?.photoUrl} />
						</div>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
						<li>
							{/* Link to profile page */}
							<Link to="/profile" className="justify-between">
								Profile
							</Link>
						</li>
						<li>
							{/* Link to connections page */}
							<Link to="/connections">Connections</Link>
						</li>
						<li>
							{/* Link to requests page */}
							<Link to="/requests">Requests</Link>
						</li>
						<li>
							{/* Logout option */}
							<a onClick={handleLogout}>Logout</a>
						</li>
					</ul>
				</div>
			</div>}
		</div>
	)
}

export default Navbar