import React from "react";
import "./Header.scss"; // Importing styles
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate()
  return (
    <header className="header-container">
      <div className="logo-section" onClick={() => navigate("/")}>
        <img src="https://media1.giphy.com/media/CbkGave3nh13hyubsP/giphy.gif" alt="Home Logo" className="home-logo" />
      </div>
      <div className="nav-section">
        <p className="add-btn">ADD</p>
        <p className="remove-btn">REMOVE</p>
      </div>
      <div className="login-section">
        <Link to="/login" className="login-btn">Sign Up</Link>
      </div>
    </header>
  );
};

export default Header;
