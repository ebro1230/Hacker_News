import Posts from "../components/Posts";
import Input from "../components/Input";
import LoadingIndicator from "../components/LoadingIndicator";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [newPost, setNewPost] = useState("");
  const [query, setQuery] = useState("react");
  const navigation = useNavigate();

  const handleChange = (e) => {
    setNewPost(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigation(`/search/${newPost}/page/1`);
    setNewPost("");
  };

  return (
    <>
      <Input newPost={newPost} onChange={handleChange} onClick={handleClick} />
      <Posts />
      <LoadingIndicator />
    </>
  );
}
