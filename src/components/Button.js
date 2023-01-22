import React from "react";

export default function Button(props) {
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
