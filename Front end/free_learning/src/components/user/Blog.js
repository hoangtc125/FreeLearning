import React from "react";
import { useState, useEffect } from "react";
import MDEditor from '@uiw/react-md-editor';
import { Comment } from "./Comment";

export function Blog() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let tmp = document.getElementById("content").firstElementChild.childNodes
    let tableOfContent = document.getElementById("table-of-content")
    tmp.forEach(e => {
      if(e.id) {
        let a = document.createElement('a')
        a.className = "list-group-item"
        a.id = '#' + (e.id)
        a.href = '#' + (e.id)
        a.appendChild(document.createTextNode('________'.substring(0, parseInt(e.tagName[1] - 1) * 2) + (e.id).replaceAll('-', ' ')));
        let isAppend = true
        tableOfContent.childNodes.forEach(child => {
          if(a.id === child.id) {
            isAppend = false
          }
        })
        if(isAppend) {
          tableOfContent.appendChild(a)
        }
      }
    })
  })
  

  return (
    <div className="container">
      <div className="my-blog">
        <div className="hide-bar">
          <div className=" left-bar">
            <p className="text-muted" style={{margin: "0", fontSize:"20px"}}>Vote</p>
            <button className="btn"><i class="fa fa-chevron-up fa-2x" aria-hidden="true"></i></button>
            <p className="text-muted" style={{margin: "0", fontSize:"20px"}}>{value}</p>
            <button className="btn"><i class="fa fa-chevron-down fa-2x" aria-hidden="true"></i></button>
            <div className="rating">
              <span>☆</span><span>☆</span><span>☆</span>
            </div>
          </div>
        </div>
        <div id="content">
          <MDEditor.Markdown source={window.localStorage.getItem("FREE_LEARNING_MD")} />
          <hr/>
          <Comment/>
        </div>
        <div style={{minWidth:"fit-content"}} className="hide-bar">
          <ul className="list-group list-group-flush right-bar">
            <div className="list-group-flush" id="table-of-content">
            </div>
            <a className="scrollUp" href="#"><i class="fa fa-arrow-circle-up fa-3x" aria-hidden="true"></i></a>
          </ul>
        </div>
      </div>
    </div>
  );
}
