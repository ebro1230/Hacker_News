import React from "react";
import Home from "./views/Home";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Input from "./components/Input";
import { useState } from "react";


function App() {
  const [newPost, setNewPost] = useState("");
  const [query, setQuery] = useState("react");

  const handleChange = (e) => {
    setNewPost(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setQuery(newPost);
    setNewPost("");
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<Home />} />
      </Routes>
      <Input newPost={newPost} onChange={handleChange} onClick={handleClick} />
      <Posts query={query} />
    </div>
  );
}

export default App;
