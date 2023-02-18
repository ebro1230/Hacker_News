import React from "react";

const Input = (props) => {
  return (
    //displays search bar with button at the end
    <div className="row">
      <div className="col-md-2"></div>
      <div className="col">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search for Topic"
            aria-label="Search for Topic"
            aria-describedby="basic-addon2"
            value={props.newPost}
            onChange={props.onChange}
            onKeyDown={props.onKeyDown}
          />
          <div class="input-group-append">
            <button
              className="btn btn-primary"
              type="button"
              onClick={props.onClick}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-2"></div>
    </div>
  );
};

export default Input;

/*    <div>
      <input
        type="text"
        placeholder="Search for Topic"
        value={props.newPost}
        onChange={props.onChange}
      />
      <button type="button" className="btn btn-primary" onClick={props.onClick}>
        Search
      </button>
    </div>*/
