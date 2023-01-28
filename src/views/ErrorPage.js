import { isCompositeComponent } from "react-dom/test-utils";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function ErrorPage() {
  const { errorType } = useParams(); //pull error type from url
  const navigation = useNavigate(); //initializes navigation
  return (
    //displays appropriate error messages based on if it is HTTPS or Network Error; Displays button to return to home page
    <>
      {errorType.includes("HTTPS") ? (
        <>
          <h1>{`HTTPS Error:`}</h1>
          <h2>{errorType}</h2>
        </>
      ) : errorType.includes("Network") ? (
        <>
          <h1>{errorType}</h1>
        </>
      ) : (
        <h1>Error</h1>
      )}
      <Button
        page="Go Back to Home Page"
        id={errorType}
        onClick={() => navigation("/")}
      />
    </>
  );
}
