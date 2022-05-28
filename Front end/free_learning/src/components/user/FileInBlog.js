import {useState} from 'react'

// Import Worker
import { Worker } from '@react-pdf-viewer/core';
// Import the main Viewer component
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// default layout plugin
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles of default layout plugin
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export function FileInBlog(data) {

  // creating new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // pdf file onChange state
  const [pdfFile, setPdfFile]=useState(data.data);

  return (
    <div className="container">
      {/* View PDF */}
      <div style={{padding:"20px"}}></div>
      <div className="viewer">
        {/* render this if we have a pdf file */}
        {pdfFile&&(
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
            <Viewer fileUrl={pdfFile}
            plugins={[defaultLayoutPluginInstance]}></Viewer>
          </Worker>
        )}
        {/* render this if we have pdfFile state null   */}
        {!pdfFile&&
        <div style={{padding:"200px", textAlign:"center"}}>No File</div>
        }
      </div>
    </div>
  );
}