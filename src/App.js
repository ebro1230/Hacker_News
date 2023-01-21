import React from "react";
import Home from "./views/Home";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/search/:query" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
