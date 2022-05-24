import React, { useState, useRef, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import mermaid from "mermaid";
import katex from 'katex';
import 'katex/dist/katex.css';
import { Loader } from "../Loader";
import * as API from '../../constants/api_config'
import { File } from "./File";

const mdMermaid = `The following are some examples of the diagrams, charts and graphs that can be made using Mermaid and the Markdown-inspired text specific to it. 

This is to display the 
\`\$\$\c = \\pm\\sqrt{a^2 + b^2}\$\$\`
 in one line

\`\`\`mermaid
graph TD
A[Hard] -->|Text| B(Round)
B --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2]
\`\`\`

\`\`\`mermaid
sequenceDiagram
Alice->>John: Hello John, how are you?
loop Healthcheck
    John->>John: Fight against hypochondria
end
Note right of John: Rational thoughts!
John-->>Alice: Great!
John->>Bob: How about you?
Bob-->>John: Jolly good!
\`\`\`
`;

const randomid = () => parseInt(String(Math.random() * 1e15), 10).toString(36);
const Code = ({ inline, children = [], className, ...props }) => {
  const demoid = useRef(`dome${randomid()}`);
  const code = getCode(children);
  const demo = useRef(null);
  const txt = children[0] || '';
  useEffect(() => {
    if (demo.current) {
      try {
        const str = mermaid.render(demoid.current, code, () => null, demo.current);
        // @ts-ignore
        demo.current.innerHTML = str;
      } catch (error) {
        // @ts-ignore
        demo.current.innerHTML = error;
      }
    }
  }, [code, demo]);
  if (inline) {
    if (typeof txt === 'string' && /^\$\$(.*)\$\$/.test(txt)) {
      const html = katex.renderToString(txt.replace(/^\$\$(.*)\$\$/, '$1'), {
        throwOnError: false,
      });
      return <code dangerouslySetInnerHTML={{ __html: html }} />;
    }
    return <code>{txt}</code>;
  }
  if (
    typeof code === "string" && typeof className === "string" &&
    /^language-mermaid/.test(className.toLocaleLowerCase())
  ) {
    return (
      <code ref={demo}>
        <code id={demoid.current} style={{ display: "none" }} />
      </code>
    );
  }
  return <code className={String(className)}>{children}</code>;
};

const getCode = (arr = []) => arr.map((dt) => {
  if (typeof dt === "string") {
    return dt;
  }
  if (dt.props && dt.props.children) {
    return getCode(dt.props.children);
  }
  return false;
}).filter(Boolean).join("");

export function Markdown() {
  const [value, setValue] = useState(mdMermaid);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [load, setLoad] = useState(false);
  const [input, setInput] = useState(false);

  function handleCreateLession() {
    setLoad(true)
    fetch(API.DOMAIN + API.CREATE_LESSION, {
      method: 'POST', // or 'PUT'
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem("FREE_LEARNING_TOKEN"),
      },
      body: JSON.stringify({ name: title, content: value, description: description, course_type: document.getElementById('inputGroupSelect01').value}),
      credentials: "same-origin",
      // mode: 'no-cors'
    })
    .then(response => {
      return response.json()})
    .then(data => {
      setLoad(false)
      if(data?.detail) {
        alert(data.detail)
      } else {
        alert("Successful !!!")
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  useEffect(() => {
    if(input) {
      document.getElementById('inp2').classList.add("active")
      document.getElementById('inp1').classList.remove("active") 
    } else {
      document.getElementById('inp1').classList.add("active")
      document.getElementById('inp2').classList.remove("active") 
    }
  }, [input])
  
  return (
    <div className="" style={{marginTop:"20px"}}>
      {load && <Loader/>}
        <div className="input-group">
          <div className="input-group-prepend" style={{minWidth:"150px"}}>
            <span style={{background:"none", border:"none"}} className="input-group-text" id="inputGroup-sizing-default">Title</span>
          </div>
          <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
            value={title}
            onChange= {(e) => setTitle(e.target.value)}  
          />
        </div>
        <div className="input-group">
          <div className="input-group-prepend" style={{minWidth:"150px"}}>
            <label style={{background:"none", border:"none"}} className="input-group-text" htmlFor="inputGroupSelect01">Type</label>
          </div>
          <select className="custom-select" id="inputGroupSelect01" style={{background:"none", border:"none"}}>
            <option selected>Math</option>
            <option>English</option>
            <option>Literature</option>
          </select>
        </div>
        <div className="input-group">
          <div className="input-group-prepend" style={{minWidth:"150px"}}>
            <span style={{background:"none", border:"none"}} className="input-group-text">Description</span>
          </div>
          <textarea className="form-control" aria-label="With textarea" spellCheck="false"
            value={description}
            onChange= {(e) => setDescription(e.target.value)}  
          ></textarea>
        </div>
        <div style={{display:"flex", justifyContent:"space-between", marginLeft:"5px", padding:"10px"}}>
          <div>
            <i className="fa fa-refresh fa-spin fa-fw"></i>
            <span className="sr-only">Auto save...</span>
          </div>
          {/* <File/> */}
          {window.localStorage.getItem("FREE_LEARNING_TOKEN") &&
            <button type="button" class="btn btn-primary btn-sm"
              onClick={() => handleCreateLession()}
            >Publish</button>
          }
          {!window.localStorage.getItem("FREE_LEARNING_TOKEN") &&
            <span className="sr-only">Please Login to publish your writing...<button type="button" className="btn btn-primary btn-sm" disabled>Publish</button></span>
            
          }
        </div>
        <div className="card text-center">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <button className="nav-link active" aria-current="true" href="#" id="inp1" style={{width:"25vw"}}
                  onClick={(e) => {
                    setInput(false)                   
                  }}
                >Writing</button>
              </li>
              <li className="nav-item">
                <button className="nav-link" aria-current="true" href="#" id="inp2" style={{width:"25vw"}}
                  onClick={(e) => {
                    setInput(true)                   
                  }}
                >Upload PDF File</button>
              </li>
            </ul>
          </div>
          <div className="card-body">
            {!input &&
              <MDEditor
              onChange={
                (newValue = "") => {
                  window.localStorage.setItem('FREE_LEARNING_MD', newValue);
                  setValue(newValue)
                }
              }
              textareaProps={{
                placeholder: "Please enter Markdown text"
              }}
              height={700}
              maxHeight={8000}
              value={value}
              previewOptions={{
                components: {
                  code: Code
                }
              }}
            />
            }
            {input &&
              <File/>
            }
          </div>
        </div>
        
    </div>
  );
}
