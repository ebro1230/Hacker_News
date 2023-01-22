import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import Button from "./Button";

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [topic, setTopic] = useState("react");
  const [numPages, setNumPages] = useState(0);
  let { query, page } = useParams();
  const [pageNum, setPageNum] = useState(0);
  const [promiseInProgress, setPromiseInProgress] = useState(false);
  const [noResults, setNoResults] = useState([1]);
  const navigation = useNavigate();
  let [num, setNum] = useState(1);

  useEffect(() => {
    if (page !== "" && page !== undefined) {
      page = Number(page);
      setPageNum(page);
      setNum(page * 30 + 1);
    }
  }, [page]);
  useEffect(() => {
    if (query !== "" && query !== undefined) {
      setTopic(query);
    }
  }, [query]);

  useEffect(() => {
    setPromiseInProgress(true);
    fetch(
      `http://hn.algolia.com/api/v1/search?query=(${topic})&page=${pageNum}&hitsPerPage=30`
    )
      .then((response) => {
        if (!response.ok) {
          navigation(`/error/HTTPStatusError${response.status}`);
        } else {
          return response;
        }
      })
      .then((response) => response.json())
      .then((json) => {
        setPosts(json.hits);
        setNumPages(json.nbPages);
        console.log(json.hits);
        setNoResults(json);
      })
      .catch((error) => {
        navigation(`/error/${error}`);
      })
      .finally(() => {
        setPromiseInProgress(false);
      });
  }, [topic, pageNum]);

  return (
    <div className="block">
      {promiseInProgress === true ? (
        <LoadingIndicator />
      ) : (
        <div className="row">
          <div className="col-2"></div>
          <div className="col">
            <table className="table table-sm table-hover table-striped">
              <thead>
                <tr>
                  <th className="table-warning">Hacker News</th>
                </tr>
              </thead>
              <tbody>
                {posts.length ? (
                  posts.map((post) => (
                    <tr key={post.objectID} className="post">
                      <th className="col">
                        {post.title !== undefined &&
                        post.title !== null &&
                        post.title !== "" ? (
                          <th>
                            {num++}. {post.title}
                          </th>
                        ) : post.story_title !== undefined &&
                          post.story_title !== null &&
                          post.story_title !== "" ? (
                          <th>
                            {num++}. {post.story_title}
                          </th>
                        ) : (
                          <th>No Title Available</th>
                        )}
                      </th>
                    </tr>
                  ))
                ) : noResults !== true ? (
                  <p>No Results For This Search</p>
                ) : null}
              </tbody>
            </table>
          </div>
          <div className="col-2"></div>
        </div>
      )}

      {pageNum > 0 ? (
        <Button
          page={"First"}
          onClick={() => navigation(`/search/${topic}/page/0`)}
        />
      ) : null}
      {pageNum > 2 ? (
        <Button
          page={pageNum - 2}
          onClick={() => navigation(`/search/${topic}/page/${pageNum - 2}`)}
        />
      ) : null}
      {pageNum > 1 ? (
        <Button
          page={pageNum - 1}
          onClick={() => navigation(`/search/${topic}/page/${pageNum - 1}`)}
        />
      ) : null}
      {pageNum !== 0 && pageNum !== Number(numPages) - 1 ? (
        <Button page={"..."} />
      ) : null}
      {pageNum <= Number(numPages) - 2 ? (
        <Button
          page={pageNum + 1}
          onClick={() => navigation(`/search/${topic}/page/${pageNum + 1}`)}
        />
      ) : null}
      {pageNum <= Number(numPages) - 3 ? (
        <Button
          page={pageNum + 2}
          onClick={() => navigation(`/search/${topic}/page/${pageNum + 2}`)}
        />
      ) : null}
      {pageNum <= Number(numPages) - 2 ? (
        <Button
          page={"Last"}
          onClick={() =>
            navigation(`/search/${topic}/page/${Number(numPages) - 1}`)
          }
        />
      ) : null}
      <br />
      <br />
    </div>
  );
}
