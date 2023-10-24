import React, { useState } from "react";
import "./Header.scss"; // Importing styles
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setUser } from "../features/user/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch()
  const [isMenuVisible, setMenuVisible] = useState(false);
  const handleLogout = () => {
    dispatch(setUser(null))
    setMenuVisible(false)
    navigate('/');
  };
  return (
    <header className="header-container">
      <div className="logo-section" onClick={() => navigate("/")}>
        <img
          src="https://media1.giphy.com/media/CbkGave3nh13hyubsP/giphy.gif"
          alt="Home Logo"
          className="home-logo"
        />
      </div>
      <div className="nav-section">
        <p className="add-btn">ADD</p>
      </div>
      {user ? (
        <>
          <div
            className="user-section"
            onClick={() => setMenuVisible(!isMenuVisible)}
          >
            <img
              src="https://gifdb.com/images/high/static-glitch-image-not-found-labitbee4o34s4cs.gif"
              alt="User Profile"
              className="user-pfp"
            />
          </div>
          {isMenuVisible && (
            <div className="user-dropdown-menu">
              <p onClick={handleLogout}>Logout</p>
            </div>
          )}
        </>
      ) : (
        <div className="login-section">
          <Link to="/login" className="login-btn">
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
