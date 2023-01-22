import Posts from "../components/Posts";
import Input from "../components/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [newPost, setNewPost] = useState(""); //initializes search value
  const navigation = useNavigate(); //initializes navigation

  //updates search term value
  const handleChange = (e) => {
    setNewPost(e.target.value);
  };

  //handles search if you click on Search Button
  const handleClick = (e) => {
    e.preventDefault();
    if (newPost == "") {
      //checks to make sure a search has been entered
      alert("Please Enter a Topic");
    } else {
      const searchTerm = newPost.replaceAll(" ", "+"); //changes search to string with + to avoid errors when searching multiple words
      navigation(`/search/${searchTerm}/page/1`); //navigates to first page of results
      setNewPost(""); //reinitializes search input value to empty
    }
  };

  //handles search if you hit enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      //checks to make sure the key pressed was Enter
      if (newPost == "") {
        //checks to make sure a search has been entered
        alert("Please Enter a Topic");
      } else {
        const searchTerm = newPost.replaceAll(" ", "+"); //changes search to string with + to avoid errors when searching multiple words
        navigation(`/search/${searchTerm}/page/1`); //navigates to first page of results
        setNewPost(""); //reinitializes search input value to empty
      }
    }
  };

  return (
    //displays Input component & Posts component
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
