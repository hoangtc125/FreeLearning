import { useEffect, useState } from "react"
import { Loader } from "./Loader"
import * as API from '../constants/api_config'

function Lession(data) {

    const [info, setInfo] = useState(data.data)
    
    return (
        <div className="col-md-6 col-lg-4">
              <div className="card-box" style={{width:"25vw", height:"200px"}}>
                  <div className="card-thumbnail">
                      <img src="images/office-image-one.jpg" className="img-fluid" alt=""/>
                  </div>
                  <h3><a href="#" className="mt-2 text-danger">{info.name}</a></h3>
                  {/* <p className="text-secondary">{info.description}</p> */}
                  <a href="#" className="btn btn-sm btn-danger float-right">Xem thêm </a>
              </div>
          </div>
    )
}

export function Home() {

    const [data, setData] = useState([])
    const [load, setLoad] = useState(false)

    useEffect(() => {
        setLoad(true)
        fetch(API.DOMAIN + API.SEARCH, {
          method: 'POST', // or 'PUT'
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ search_type: "lession", key_word: ""}),
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
            setData(data.data.results[0].result)
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, [])

  return (
    <div className="container">
        {load && <Loader/>}
      <div className="row" style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
            <div className="col-12">
                <h2 className="mt-4 mb-4">Khóa học mới </h2>
            </div>
            {data &&
                data.map((dt, id) => {
                    return <Lession key={id} data={{"id":dt.id, "name":dt.name, "description":dt.description, "number_of_views":dt.number_of_views, "course_type":dt.course_type}}/>
                })
            }
      </div>
  </div>
  )
}