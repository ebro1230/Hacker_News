import React from "react";
import { useState } from "react";

const Input = (props) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search for Topic"
        value={props.newPost}
        onChange={props.onChange}
      />
      <button onClick={props.onClick}>Search</button>
    </div>
  );
};

export default Input;
