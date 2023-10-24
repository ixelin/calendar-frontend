import React, { useState } from "react";
import "./Header.scss"; // Importing styles
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setUser } from "../features/user/userSlice";
import AddModal from "./AddModal";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const handleLogout = () => {
    dispatch(setUser(null));
    setMenuVisible(false);
    navigate("/");
  };
  const handleAddModalOpen = () => {
    setModalVisible(true);
  };

  const handleAddModalClose = () => {
    setModalVisible(false);
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
      {user && (
        <div className="nav-section">
          <p className="add-btn" onClick={handleAddModalOpen}>
            ADD
          </p>
        </div>
      )}

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
      <AddModal isOpen={isModalVisible} onClose={handleAddModalClose} />
    </header>
  );
};

export default Header;
