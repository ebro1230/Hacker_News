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
            {post.title !== undefined &&
            post.title !== null &&
            post.title !== "" ? (
              <>
                <p>Title: {post.title}</p>
              </>
            ) : post.story_title !== undefined &&
              post.story_title !== null &&
              post.story_title !== "" ? (
              <>
                <p>Title: {post.story_title}</p>
              </>
            ) : post._highlightResult.title.value !== undefined &&
              post._highlightResult.title.value !== null &&
              (post._highlightResult.title.value !== "") !== undefined &&
              post._highlightResult.title.value !== "" ? (
              <p>Title: {post._highlightResult.title.value}</p>
            ) : post._highlightResult.story_title.value !== undefined &&
              post._highlightResult.story_title.value !== null &&
              (post._highlightResult.story_title.value !== "") !== undefined &&
              post._highlightResult.story_title.value !== "" ? (
              <p>Title: {post._highlightResult.story_title.value}</p>
            ) : (
              <p>No Title Available</p>
            )}
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
