import React from "react";
import Posts from "./components/Posts";
import "./App.css";
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
      <Input newPost={newPost} onChange={handleChange} onClick={handleClick} />
      <Posts query={query} />
    </div>
  );
}

export default App;
