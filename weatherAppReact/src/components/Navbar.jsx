import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';

const Navbar = ({ isAuthenticated, onLogout, currentUser }) => (
  <div className="navbar">
    <div>
      {isAuthenticated && <Link to="/weather">Weather</Link>}
    </div>
    <div>
      {isAuthenticated ? (
        <>
          {currentUser && <span className="user-info">User: {currentUser.email}</span>}
          <button className="logout-button" onClick={onLogout}>Logout</button>
        </>
      ) : (
        <div className='l-r-buttons'>
          <Link  to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  </div>
);

export default Navbar;
