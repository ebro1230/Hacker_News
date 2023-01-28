import React from "react";

export default function Button(props) {
  //displays button with appropriate values from props
  return (
    <button
      type="button"
      className="btn btn-secondary"
      key={props.page}
      id={props.page}
      onClick={props.onClick}
    >
      {props.page}
    </button>
  );
}
