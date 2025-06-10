import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(''); // 'restaurant' or 'ngo'
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setIsLoggedIn(true);
      try {
        const parsedUser = JSON.parse(user);
        setUserType(parsedUser.role);
      } catch {
        setUserType('');
      }
    } else {
      setIsLoggedIn(false);
      setUserType('');
    }
  }, [location]);

  // Mock logout function - would be replaced with actual auth logic
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType('');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-recycle me-2"></i>
          ZeroWaste Connect
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            {isLoggedIn && userType === 'restaurant' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/restaurant/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/donation/new">Donate Food</Link>
                </li>
              </>
            )}
            {isLoggedIn && userType === 'ngo' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/ngo/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/donations">Available Donations</Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>
          <div className="d-flex">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="btn btn-outline-success me-2">Login</Link>
                <Link to="/register" className="btn btn-success">Register</Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="btn btn-outline-success me-2">Profile</Link>
                <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 