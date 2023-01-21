import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [topic, setTopic] = useState("react");
  const { query } = useParams();
  const navigation = useNavigate();
  if (query) {
    setTopic(query);
  }

  useEffect(() => {
    fetch(`http://hn.algolia.com/api/v1/search_by_date?query=${topic}`)
      .then((response) => {
        console.log(response);
        response.json();
      })
      .then((json) => {
        setPosts(json.hits);
      })
      .catch((response) => {
        const errorId = response.value;
        navigation(`/error/${errorId}`);
      });
  }, []);

  return (
    <div className="block">
      {posts.length ? (
        posts.map((post) => (
          <div key={post.objectID} className="post">
            <p>Title: {post._highlightResult.story_title.value}</p>
            <p>Author: {post._highlightResult.author.value}</p>
            <p>post ID#: {post.objectID}</p>
          </div>
        ))
      ) : (
        <div>No Posts Matching That Topic</div>
      )}
    </div>
  );
}
