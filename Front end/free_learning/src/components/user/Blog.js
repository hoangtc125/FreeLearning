import React from "react";
import MDEditor from '@uiw/react-md-editor';

export function Blog() {
  return (
    <div className="container">
      <MDEditor.Markdown source={window.localStorage.getItem("FREE_LEARNING_MD")} />
    </div>
  );
}
