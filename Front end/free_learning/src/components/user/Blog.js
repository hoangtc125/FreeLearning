import React from "react";
import { useState } from "react";
import MDEditor from '@uiw/react-md-editor';

export function Blog() {
  const [value, setValue] = useState(0);
  return (
    <div className="container my-blog">
      <div className="">
        <div className=" left-bar">
          <button className="btn"><i class="fa fa-chevron-up fa-2x" aria-hidden="true"></i></button>
          <p className="text-muted" style={{margin: "0", fontSize:"20px"}}>{value}</p>
          <button className="btn"><i class="fa fa-chevron-down fa-2x" aria-hidden="true"></i></button>
          <div className="rating">
            <span>☆</span><span>☆</span><span>☆</span>
          </div>
        </div>
      </div>
      <MDEditor.Markdown source={window.localStorage.getItem("FREE_LEARNING_MD")} />
      <div></div>
    </div>
  );
}
