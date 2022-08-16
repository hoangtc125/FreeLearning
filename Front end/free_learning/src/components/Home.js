import { useEffect, useState } from "react"
import { Loader } from "./Loader"
import * as API from '../constants/api_config'
import lesson from '../images/lesson.png'
import { Link } from "react-router-dom"

function Lession(data) {

    const [info, setInfo] = useState(data.data)
    
    return (
      <div className="col-md-6 col-lg-4">
        <div className="card my-3">
            <div className="card-thumbnail">
                <img src={lesson} className="img-fluid" alt="thumbnail"/>
            </div>
            <Link className="card-body" to={'/user/get-one-lession/' + info.id}>
                <h3 className="card-title" ><a href="#" className="text-secondary">{info.name.slice(0, 20) + "..."}</a></h3>
                <p className="card-text">{info.description.slice(0, 50) + "..."}</p>
                <a href="/" className="btn btn-danger"
                >Xem thêm </a>
            </Link>
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
          if(data?.detail) {
            alert(data.detail)
          } else {
            setData(data.data.results[0].result)
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
        setLoad(false)
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