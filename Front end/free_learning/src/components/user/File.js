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

export function File() {

  // creating new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // pdf file onChange state
  const [pdfFile, setPdfFile]=useState(window.localStorage.getItem('FREE_LEARNING_PDF'));

  // pdf file error state
  const [pdfError, setPdfError]=useState('');


  // handle file onChange event
  const allowedFiles = ['application/pdf'];
  const handleFile = (e) =>{
    let selectedFile = e.target.files[0];
    // console.log(selectedFile.type);
    if(selectedFile){
      if(selectedFile&&allowedFiles.includes(selectedFile.type)){
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend=(e)=>{
          setPdfError('');
          setPdfFile(e.target.result);
          window.localStorage.setItem("FREE_LEARNING_PDF", e.target.result)
        }
      }
      else{
        setPdfError('Not a valid pdf: Please select only PDF');
        setPdfFile('');
        window.localStorage.setItem("FREE_LEARNING_PDF", '')
      }
    }
    else{
      console.log('please select a PDF');
    }
  }

  return (
    <div className="container" style={{width:"100vw"}}>

      {/* Upload PDF */}
      <form>

        <label><h5>Tải File PDF lên </h5></label>
        <br></br>

        <div style={{display:"flex"}}>
          <input type='file' className="form-control"
          onChange={handleFile}></input>
          <a href='#' className="btn btn-secondary btn-sm" style={{width:"200px", margin:"0px 20px", textDecoration:"none"}}
            onClick={(e) => {
              e.preventDefault()
              window.localStorage.setItem('FREE_LEARNING_PDF', '')
              setPdfFile('')
            }}
          >Remove File</a>
        </div>

        {/* we will display error message in case user select some file
        other than pdf */}
        {pdfError&&<span className='text-danger'>{pdfError}</span>}

      </form>

      {/* View PDF */}
      <div style={{padding:"20px"}}></div>
      <h5>Chế độ xem trước </h5>
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
          <div style={{padding:"200px", textAlign:"center"}}>Không có file để hiện thị </div>
        }
      </div>

    </div>
  );
}