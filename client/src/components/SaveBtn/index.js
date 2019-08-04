import React from "react";
import "./style.css";

function SaveBtn(props) {
  return (
    <button className="save-btn" {...props} role="button" tabIndex="0" style={{ float: "right", marginBottom: 10 }} className="btn btn-success">
      save
    </button>
  );
}

export default SaveBtn;
