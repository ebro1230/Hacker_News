import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [topic, setTopic] = useState("react");
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const { query, pageNum } = useParams();

  useEffect(() => {
    if (pageNum !== "" && pageNum !== undefined) {
      setPageNumber(pageNum);
    }
  });
  useEffect(() => {
    if (query !== "" && query !== undefined) {
      setTopic(query);
    }
  }, [query]);

  useEffect(() => {
    trackPromise(
      fetch(
        `http://hn.algolia.com/api/v1/search?query=${topic}&page=${pageNumber}&hitsPerPage=200`
      )
        .then((response) => response.json())
        .then((json) => {
          setPosts(json.hits);
          setNumPages(json.nbPages);
        })
        .catch((response) => {
          alert("Request Error");
        })
    );
  }, [topic]);

  return (
    <div className="block">
      {posts.length
        ? posts.map((post) => (
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
                (post._highlightResult.story_title.value !== "") !==
                  undefined &&
                post._highlightResult.story_title.value !== "" ? (
                <p>Title: {post._highlightResult.story_title.value}</p>
              ) : (
                <p>No Title Available</p>
              )}
              <p>Author: {post.author}</p>
              <p>post ID#: {post.objectID}</p>
            </div>
          ))
        : null}
    </div>
  );
}
