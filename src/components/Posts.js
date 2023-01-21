import React, { useState, useEffect } from "react";

export default function Post() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`http://hn.algolia.com/api/v1/search_by_date?query=react`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json.hits);
        setPosts(json.hits);
      })
      .catch(() => alert("Request Failed"));
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
