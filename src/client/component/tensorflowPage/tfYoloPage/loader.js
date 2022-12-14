import "./style/loader.css";
import React from "react";

const Loader = (props) => {
  return (
    <div className="wrapper" {...props}>
      <div className="spinner"></div>
      <p>{props.children}</p>
    </div>
  );
};

export default Loader;
