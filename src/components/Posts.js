import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import Button from "./Button";

export default function Post() {
  const [posts, setPosts] = useState([]); //initializes posts array
  const [topic, setTopic] = useState("react"); //initializes topic being searched for
  const [numPages, setNumPages] = useState(0); //initializes the number of pages a topic has
  let { query, page } = useParams(); //pulls the topic and page that is provided in the url from Search feature & Pagination
  const [pageNum, setPageNum] = useState(0); //initializes the page number being displayed
  const [promiseInProgress, setPromiseInProgress] = useState(false);
  const [noResults, setNoResults] = useState([1]); //array to determine if no results are found for a topic
  const navigation = useNavigate(); //navigation from page to page
  let [num, setNum] = useState(1); //numbering of results in the table

  //Sets the page number to display for the fetch if it isn't the first page; sets the numbering of posts based on page
  useEffect(() => {
    if (page !== "" && page !== undefined) {
      page = Number(page);
      setPageNum(page);
      setNum(page * 30 + 1);
    }
  }, [page]);

  //Sets the topic for the fetch if it comes from the search function
  useEffect(() => {
    if (query !== "" && query !== undefined) {
      setTopic(query);
    }
  }, [query]);

  //fetches posts based on topic & page number
  useEffect(() => {
    setPromiseInProgress(true); //tells loader indicator to display
    fetch(
      `http://hn.algolia.com/api/v1/search?query=(${topic})&page=${pageNum}&hitsPerPage=30` //fetch api
    )
      .then((response) => {
        //checks to see if there is an HTTP Status error & changes page to error page
        if (!response.ok) {
          navigation(`/error/HTTPStatusError${response.status}`);
        } else {
          return response;
        }
      })
      .then((response) => response.json()) //turns response into JSON
      .then((json) => {
        //sets the post array with data that is fetched; the number of pages based on the topic searched; determines if no results are found
        setPosts(json.hits);
        setNumPages(json.nbPages);
        console.log(json.hits);
        setNoResults(json);
      })
      .catch((error) => {
        //catches Network Errors & changes page to error page
        navigation(`/error/${error}`);
      })
      .finally(() => {
        setPromiseInProgress(false); //tells loader indicator to stop displaying
      });
  }, [topic, pageNum]);

  return (
    <div className="block">
      {promiseInProgress === true ? ( //displays loading indicator
        <LoadingIndicator />
      ) : (
        //displays table of results post# & post Title; Displays if no results match search; displays pagination buttons
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
