import lesson from '../../images/lesson.png'
import { Loader } from '../Loader'
import * as API from '../../constants/api_config'
import { useState, useEffect } from 'react'

export function UserLessions(data) {

    const [username, setUsername] = useState(data.username)
    const [load, setLoad] = useState(false)
    const [lessons, setLessons] = useState([])
  
    useEffect(() => {
      setLoad(true)
      fetch(API.DOMAIN + API.GET_ALL_LESSONS + username, {
        method: 'POST', // or 'PUT'
        headers: {
          'accept': 'application/json',
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
            setLessons(data.data)
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
        setLoad(false)
    }, [data])


    function handleRemove(_id) {
        setLoad(true)
        fetch(API.DOMAIN + API.DELETE_LESSON + _id, {
            method: 'DELETE', // or 'PUT'
            headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
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
                alert(data.data)
                setLessons(ls => {
                    let _ls = []
                    ls.map((l) => {
                        if(l.id !== _id) {
                            _ls.push(l)
                        }
                    })
                    return _ls
                })
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        setLoad(false)
    }

    return (
      <section className="py-4 my-5">
      {load && <Loader/>}
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2 className="mb-3 text-danger">Bài giảng nổi bật </h2>
                </div>
                {lessons && 
                lessons.map((ls, id) => {
                    return (
                        <a href='#' className="col-md-6 col-lg-4" key={id} style={{textDecoration:"none", color:"#333"}}
                            onClick={e => {
                                e.preventDefault()
                                window.localStorage.setItem("FREE_LEARNING_ID_FOUND", ls.id)
                                window.location.href = API.GET_ONE_LESSION + ls.id
                            }}
                        >
                            <div className="card my-3">
                                <div className="card-thumbnail">
                                    <img src={lesson} className="img-fluid" alt="thumbnail"/>
                                </div>
                                    <div className="card-body">
                                        <h3 className="card-title" ><a href="#" className="text-secondary">{ls.name.slice(0, 20) + "..."}</a></h3>
                                        <p className="card-text">{ls.description.slice(0, 50) + "..."}</p>
                                    {window.localStorage.getItem('FREE_LEARNING_USERNAME') === username &&
                                        <div style={{display:"flex", justifyContent:"space-around"}}>
                                            <a href="#" style={{width:"40%"}} className="btn btn-success"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    e.preventDefault()
                                                    window.localStorage.setItem("FREE_LEARNING_ID_EDIT", ls.id)
                                                    window.location.href = '/user/edit-lession'
                                                }}
                                            >Chỉnh sửa </a>
                                            <a href="#" style={{width:"40%"}} className="btn btn-danger"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    e.preventDefault()
                                                    handleRemove(ls.id)
                                                }}
                                            >Xóa </a>
                                        </div>
                                    }
                                    </div>
                            </div>
                        </a>
                    )
                })
                }
            </div>
        </div>
      </section>
    )
  }