import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Calendar from "./components/pages/Calendar";
import Header from "./components/Header";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import NotFoundPage from "./components/pages/NotFoundPage";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
