import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [topic, setTopic] = useState("react");
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const { query, pageNum } = useParams();
  const [promiseInProgress, setPromiseInProgress] = useState(false);
  const [noResults, setNoResults] = useState([1]);

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
    setPromiseInProgress(true);
    fetch(
      `http://hn.algolia.com/api/v1/search?query=(${topic})&page=${pageNumber}&hitsPerPage=300`
    )
      .then((response) => {
        if (!response.ok) {
          // Put Navigation Here for HTTPS Status Errors (can use response.status to get status value)
        }
        return response;
      })
      .then((response) => {
        console.log(response);
        response.json();
      })
      .then((json) => {
        setPosts(json.hits);
        setNumPages(json.nbPages);
        setNoResults(json);
      })
      .catch((error) => {
        //Put Navigation Stating Network Error
      })
      .finally(() => {
        setPromiseInProgress(false);
      });
  }, [topic]);

  return (
    <div className="block">
      {promiseInProgress === true ? (
        <LoadingIndicator />
      ) : posts.length ? (
        posts.map((post) => (
          <div key={post.objectID} className="post">
            {post.title !== undefined &&
            post.title !== null &&
            post.title !== "" ? (
              <p>Title: {post.title}</p>
            ) : post.story_title !== undefined &&
              post.story_title !== null &&
              post.story_title !== "" ? (
              <p>Title: {post.story_title}</p>
            ) : (
              <p>No Title Available</p>
            )}
            <p>Author: {post.author}</p>
            <p>post ID#: {post.objectID}</p>
          </div>
        ))
      ) : noResults !== true ? (
        <p>No Results For This Search</p>
      ) : null}
    </div>
  );
}
