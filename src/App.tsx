import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Calendar from "./components/Calendar";
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
