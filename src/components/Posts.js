import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Post(props) {
  const [posts, setPosts] = useState([]);
  const [topic, setTopic] = useState("react");
  const navigation = useNavigate();
  useEffect(() => {
    if (props.query !== "") {
      setTopic(props.query);
    }
  }, [props.query]);

  useEffect(() => {
    fetch(`http://hn.algolia.com/api/v1/search?query=${topic}`)
      .then((response) => response.json())
      .then((json) => {
        setPosts(json.hits);
        console.log(json.hits);
      })
      .catch((response) => {
        alert("No Topics Matching Your Search");
      });
  }, [topic]);

  return (
    <div className="block">
      {posts.length ? (
        posts.map((post) => (
          <div key={post.objectID} className="post">
            <p>Title: {post.title}</p>
            <p>Author: {post.author}</p>
            <p>post ID#: {post.objectID}</p>
          </div>
        ))
      ) : (
        <div>No Posts Matching That Topic</div>
      )}
    </div>
  );
}
