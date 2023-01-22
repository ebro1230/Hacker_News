import React from "react";
import Home from "./views/Home";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "./views/ErrorPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="search/:query/page/:page" element={<Home />} />
          <Route path="error/:errorType" element={<ErrorPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
