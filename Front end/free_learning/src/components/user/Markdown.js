import React, { useState, useRef, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import mermaid from "mermaid";
import katex from 'katex';
import 'katex/dist/katex.css';

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
  return (
    <div className="" style={{marginTop:"20px"}}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">Title</span>
          </div>
          <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
            value={title}
            onChange= {(e) => setTitle(e.target.value)}  
          />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Description</span>
          </div>
          <textarea className="form-control" aria-label="With textarea" spellCheck="false"></textarea>
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text" for="inputGroupSelect01">Type</label>
          </div>
          <select className="custom-select" id="inputGroupSelect01">
            <option selected>Choose...</option>
            <option value="Math">Math</option>
            <option value="English">English</option>
            <option value="Literature">Literature</option>
          </select>
        </div>
        <div style={{display:"flex", justifyContent:"space-between", paddingBottom:"10px"}}>
          <div>
            <i className="fa fa-refresh fa-spin fa-fw"></i>
            <span className="sr-only">Auto save...</span>
          </div>
          <button type="button" class="btn btn-primary btn-sm">Publish</button>
        </div>
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
    </div>
  );
}
