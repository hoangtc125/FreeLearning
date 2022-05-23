import React from "react";
import { useState, useEffect } from "react";
import MDEditor from '@uiw/react-md-editor';
import { Comment } from "./Comment";
import { Loader } from "../Loader";
import * as API from '../../constants/api_config'

export function Blog(data) {

  const [value, setValue] = useState(0);
  const [content, setContent] = useState("");
  const [load, setLoad] = useState(false)

  useEffect(() => {
    if (data.api) {
      setLoad(true)
      fetch(API.DOMAIN + data.api, {
        method: 'POST', // or 'PUT'
        headers: {
          'accept': 'application/json',
          'Authorization': window.localStorage.getItem("FREE_LEARNING_TOKEN"),
        },
        credentials: "same-origin",
        // mode: 'no-cors'
      })
      .then(response => {
        return response.json()})
      .then(data => {
        if(data?.detail) {
          alert(data.detail)
        } else {
          setContent(data.data.content)
          setLoad(false)
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }, [data])

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
  }, [content])
  

  return (
    <div className="container" >
      {load && <Loader/>}
      <div className="my-blog">
        <div className="hide-bar">
          <div className=" left-bar">
            <p className="text-muted" style={{margin: "0", fontSize:"20px"}}>Vote</p>
            <button className="btn"><i className="fa fa-chevron-up fa-2x" aria-hidden="true"></i></button>
            <p className="text-muted" style={{margin: "0", fontSize:"20px"}}>{value}</p>
            <button className="btn"><i className="fa fa-chevron-down fa-2x" aria-hidden="true"></i></button>
            <div className="rating">
              <span>☆</span><span>☆</span><span>☆</span>
            </div>
          </div>
        </div>
        <div id="content" style={{maxWidth:"65vw"}}>
          <MDEditor.Markdown source={content} />
          <hr/>
          <Comment/>
        </div>
        <div style={{minWidth:"fit-content"}} className="hide-bar">
          <ul className="list-group list-group-flush right-bar">
            <div className="list-group-flush" id="table-of-content">
            </div>
            <a className="scrollUp" href="#"><i className="fa fa-arrow-circle-up fa-3x" aria-hidden="true"></i></a>
          </ul>
        </div>
      </div>
    </div>
  );
}
