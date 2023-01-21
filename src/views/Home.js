import Posts from "../components/Posts";
import Input from "../components/Input";
import { useState } from "react";

export default function Home() {
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
    <>
      <Input newPost={newPost} onChange={handleChange} onClick={handleClick} />
      <Posts query={query} />
    </>
  );
}
