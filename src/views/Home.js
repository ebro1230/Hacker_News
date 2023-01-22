import Posts from "../components/Posts";
import Input from "../components/Input";
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
    if (newPost == "") {
      alert("Please Enter a Topic");
    } else {
      const searchTerm = newPost.replaceAll(" ", "+");
      navigation(`/search/${searchTerm}/page/1`);
      setNewPost("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (newPost == "") {
        alert("Please Enter a Topic");
      } else {
        const searchTerm = newPost.replaceAll(" ", "+");
        navigation(`/search/${searchTerm}/page/1`);
        setNewPost("");
      }
    }
  };

  return (
    <>
      <br />
      <Input
        newPost={newPost}
        onChange={handleChange}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      />
      <Posts />
    </>
  );
}
