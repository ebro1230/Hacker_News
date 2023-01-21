import React from "react";
import Home from "./views/Home";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
