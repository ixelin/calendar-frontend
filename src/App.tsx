import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Calendar from "./components/pages/Calendar";
import Header from "./components/Header";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import NotFoundPage from "./components/pages/NotFoundPage";
import SelectEvent from "./components/pages/SelectEvent";
import { useAppDispatch } from "./app/hooks";
import { getUser } from "./features/user/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getUser());
    }
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:id" element={<SelectEvent />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
