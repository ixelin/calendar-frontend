import React, { useState } from "react";
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setUser } from "../../features/user/userSlice";
import AddModal from "./AddModal";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { setCalendar } from "../../features/Calendar/calendarSlice";
const Header = () => {
  const navigate = useNavigate();
  const { user, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    dispatch(setCalendar([]));
    setMenuVisible(false);
    navigate("/");
  };
  const handleDownload = () => {
    console.log(user);
    setMenuVisible(false);
  };
  const handleAddModalOpen = () => {
    setModalVisible(true);
  };

  const handleAddModalClose = () => {
    setModalVisible(false);
  };

  return (
    <>
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
              <p onClick={handleDownload}>Download calendar</p>
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
      <Box sx={{ width: "100%" }}>
        {loading && <LinearProgress />}
      </Box>
    </>
  );
};

export default Header;
