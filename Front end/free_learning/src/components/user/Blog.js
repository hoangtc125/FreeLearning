import React from "react";
import { useState, useEffect } from "react";
import MDEditor from '@uiw/react-md-editor';
import { Comment } from "./Comment";
import { Loader } from "../Loader";
import * as API from '../../constants/api_config'
import {FileInBlog} from './FileInBlog'

export function Blog(data) {

  const [value, setValue] = useState(0);
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [created_at, setCreatedAt] = useState("");
  const [modified_at, setModifiedAt] = useState("");
  const [number_of_views, setNumberOfViews] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [avatar, setAvatar] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const [idBlog, setIdBlog] = useState(false);
  const [load, setLoad] = useState(false)
  const [input, setInput] = useState(false);

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
          setAuthor(data.data[1].fullname)
          setAvatar(data.data[1].avatar)
          setRole(data.data[1].role)
          setId(data.data[1].id)
          setTitle(data.data[0].name)
          setIdBlog(data.data[0].id)
          setFile(data.data[0].file)
          setDescription(data.data[0].description)
          setCreatedAt(new Date(data.data[0].created_at * 1000 + 25200000).toLocaleString())
          setModifiedAt(new Date(data.data[0].modified_at * 1000 + 25200000).toLocaleString())
          setNumberOfViews(data.data[0].number_of_views)
          setContent(data.data[0].content)
          setLoad(false)
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }, [data])

  useEffect(() => {
    if(input) {
      document.getElementById('inp2').classList.add("active")
      document.getElementById('inp1').classList.remove("active") 
    } else {
      document.getElementById('inp1').classList.add("active")
      document.getElementById('inp2').classList.remove("active") 
    }
  }, [input])

  useEffect(() => {
    let tmp = document.getElementById("content").childNodes[1].firstChild.childNodes
    console.log(tmp)
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
      <figure style={{margin:"50px 0px 0px"}}>
        <blockquote class="blockquote">
          <h1 className="display-4"><strong>{title}</strong></h1>
        </blockquote>
        <figcaption className="blockquote-footer mt-3">
          {description}
        </figcaption>
        <div style={{display:"flex", justifyContent:"space-between"}} className="mt-2">
            <p className="text-muted" style={{margin: "0", fontSize:"20px"}}>Tác giả : <strong>{author}</strong></p>
            <p className="text-muted" style={{margin: "0", fontSize:"20px"}}>Lượt xem : <strong>{number_of_views}</strong></p>
            <p className="text-muted" style={{margin: "0", fontSize:"20px"}}>Ngày đăng : <strong>{created_at}</strong></p>
            <p className="text-muted" style={{margin: "0", fontSize:"20px"}}>Ngày chỉnh sửa cuối : <strong>{modified_at}</strong></p>
        </div>
      </figure>
      <div className="my-blog" style={{maxWidth:"100vw"}}>
        <div className="hide-bar">
          <div className=" left-bar">
            <a href="#" onClick={() => {
              window.localStorage.setItem("FREE_LEARNING_ID_FOUND", id)
              window.location.href = API.FIND_ONE + id
            }}><img src={avatar} style={{maxWidth:"5vw"}}></img></a>
            <p className="text-muted" style={{margin: "0", fontSize:"20px"}}>{role}</p>
            <p className="text-muted mt-4" style={{margin: "0", fontSize:"20px"}}>Vote </p>
            <button className="btn" onClick={() => {
              setValue(val => val + 1)
            }}><i className="fa fa-chevron-up fa-2x" aria-hidden="true"></i></button>
            <p className="text-muted" style={{margin: "0", fontSize:"20px"}}>{value}</p>
            <button className="btn" onClick={() => {
              setValue(val => val - 1)
            }}><i className="fa fa-chevron-down fa-2x" aria-hidden="true"></i></button>
            <div className="rating">
              <span>☆</span><span>☆</span><span>☆</span>
            </div>
            <i className="fa fa-eye fa-2x mt-4" aria-hidden="true"></i>
            <p className="text-muted" style={{margin: "0", fontSize:"20px"}}>{number_of_views}</p>
          </div>
        </div>
        <div id="content" style={{maxWidth:"60vw"}}>
          <div className="card-header" style={{margin:"15px 0px"}}>
            <ul className="nav nav-tabs card-header-tabs" style={{display:"flex"}}>
              <li className="nav-item" style={{flexGrow:"1"}}>
                <button className="nav-link active" aria-current="true" href="#" id="inp1" style={{width:"100%"}}
                  onClick={(e) => {
                    setInput(false)                   
                  }}
                >Nội dung </button>
              </li>
              <li className="nav-item" style={{flexGrow:"1"}}>
                <button className="nav-link" aria-current="true" href="#" id="inp2" style={{width:"100%"}}
                  onClick={(e) => {
                    setInput(true)                   
                  }}
                >File PDF đính kèm </button>
              </li>
            </ul>
          </div>
          {!input && 
            <div style={{width:"60vw"}}>
              <MDEditor.Markdown source={content} />
            </div>
          }
          {input &&
            <FileInBlog data={file}/>
          }
          <hr/>
          {idBlog && 
            <Comment id={idBlog}/>
          }
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
