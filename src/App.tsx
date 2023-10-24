import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Calendar from "./components/pages/Calendar";
import Header from "./components/Header";
import Login from "./components/pages/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
