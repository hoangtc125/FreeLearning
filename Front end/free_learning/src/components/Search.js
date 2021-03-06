import Calendar from 'react-calendar';
import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import * as API from '../constants/api_config'
import { Loader } from './Loader';
import lessionImg from '../images/lesson.png'

function ResultUser(data) {

  const [info, setInfo] = useState(data.data)

  return (
    <tr onClick={() => {
      window.localStorage.setItem("FREE_LEARNING_ID_FOUND", info.id)
      window.location.href = API.FIND_ONE + info.id
    }}>
      <td className="number" style={{width:"5px"}}>{info.key + 1}</td>
      <td className="image" style={{textAlign:"center", color:"#666666"}}>
      {info.avatar === null &&
        <i className="fa fa-user fa-4x" aria-hidden="true"></i>
      }
      {info.avatar !== null &&
        <img className="" src={info.avatar} style={{maxHeight:"50px", maxWidth:"50px"}}/>
      }
      </td>
      <td className="" style={{width:"40vw"}}><strong>{info.fullname}</strong><br/>{info.role}</td>
      <td className="text-right">
        <div>Điện thoại : {info.phone}</div>
        <div>Email : {info.email}</div>
      </td>
    </tr>
  )
}

function ResultLessionCourse(data) {

  const [info, setInfo] = useState(data.data)

  return (
    <tr onClick={() => {
      window.localStorage.setItem("FREE_LEARNING_ID_FOUND", info.id)
      window.location.href = API.GET_ONE_LESSION + info.id
    }}>
      <td className="number" style={{width:"5px"}}>{info.key + 1}</td>
      <td className="image" style={{textAlign:"center", color:"#666666"}}>
        {info.category === "lession" &&
          // <i className="fa fa-leanpub fa-4x" aria-hidden="true"></i>
          <img src={lessionImg} alt="lession"></img>
        }
        {info.category === "course" &&
          <i className="fa fa-book fa-4x" aria-hidden="true"></i>
        }
        {info.category === "homework" &&
          <i className="fa fa-file-text fa-4x" aria-hidden="true"></i>
        }
      </td>
      <td className="" style={{width:"40vw"}}>
        <div>
          <strong>{info.name}</strong><br/>{info.description}
        </div>
      </td>
      <td className="text-right">
        <div>Chủ đề : <strong>{info.course_type}</strong></div>
        <div>Lượt xem : {info.number_of_views}</div>
      </td>
    </tr>
  )
}

export function Search() {

  const [dateFrom, setDateFrom] = useState(new Date());
  const [keyword, setkeyword] = useState("")
  const [status, setStatus] = useState("Nhập từ khóa bạn muốn tìm kiếm ")
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
        setData(data.data.results)
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, [])

  function handleSearch() {
    const radios = document.getElementsByName("flexRadioDefault")
    radios.forEach(radio => {
      if(radio.checked) {
        setLoad(true)
        fetch(API.DOMAIN + API.SEARCH, {
          method: 'POST', // or 'PUT'
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ search_type: radio.id, key_word: keyword}),
          credentials: "same-origin",
          // mode: 'no-cors'
        })
        .then(response => {
          return response.json()})
        .then(data => {
          if(data?.detail) {
            alert(data.detail)
          } else {
            setData(data.data.results)
            setStatus("Kết quả tìm kiếm của từ khóa '" + keyword + "' trong " + data.data.process_time + " s")
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
        setLoad(false)
      }
    })
  }

  return (
    <div className="container">
      {load && <Loader/>}
      <div className="row">
        {/* <!-- BEGIN SEARCH RESULT --> */}
        <div className="col-md-12">
          <div className="grid search">
            <div className="grid-body">
              <div className="row">
                {/* <!-- BEGIN FILTERS --> */}
                <div className="col-md-3">
                  <h2 className="grid-title"><i className="fa fa-filter"></i> Bộ lọc </h2>
                  <hr/>
                  
                  {/* <!-- BEGIN FILTER BY CATEGORY --> */}
                  <h4>Tìm theo danh mục :</h4>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="lession" defaultChecked/>
                    <label className="form-check-label" htmlFor="lession">
                      Bài giảng 
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="course"/>
                    <label className="form-check-label" htmlFor="course">
                      Khóa học 
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="user"/>
                    <label className="form-check-label" htmlFor="user">
                      Người dùng 
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="homework"/>
                    <label className="form-check-label" htmlFor="homework">
                      Bài làm 
                    </label>
                  </div>
                  {/* <!-- END FILTER BY CATEGORY --> */}
                  
                  <div className="padding"></div>
                  
                  {/* <!-- BEGIN FILTER BY DATE --> */}
                  <h4>Tìm theo ngày :</h4>
                  <div>
                    <Calendar onChange={setDateFrom} value={dateFrom} />
                  </div>
                  {/* <!-- END FILTER BY DATE --> */}
                  
                  <div className="padding"></div>
                  
                  {/* <!-- BEGIN FILTER BY PRICE --> */}
                  <h4>Tìm theo giá :</h4>
                  Từ <div id="price1">$300</div> đến <div id="price2">$800</div>
                  <div className="slider-primary">
                    <div className="slider slider-horizontal" style={{width:"152px"}}>
                          <div className="slider-track">
                            <div className="slider-selection" style={{left:"30%", width:"50%"}}></div>
                            <div className="slider-handle round" style={{left:"30%"}}></div>
                            <div className="slider-handle round" style={{left:"80%"}}></div>
                            </div>
                            <div className="tooltip top hide" style={{top:"-30px", left:"50.1px"}}>
                            <div className="tooltip-arrow"></div>
                            <div className="tooltip-inner">300 : 800</div>
                            </div>
                            <input type="text" className="slider" defaultValue="" data-slider-min="0" data-slider-max="1000" data-slider-step="1" data-slider-value="[300,800]" data-slider-tooltip="hide"/></div>
                  </div>
                  {/* <!-- END FILTER BY PRICE --> */}
                </div>
                {/* <!-- END FILTERS --> */}
                {/* <!-- BEGIN RESULT --> */}
                <div className="col-md-9">
                  <h2><i className="fa fa-file-o"></i> Kết quả </h2>
                  <hr/>
                  {/* <!-- BEGIN SEARCH INPUT --> */}
                  <div className="input-group">
                    <input type="text" className="form-control"
                      onChange={(e) => setkeyword(e.target.value)}
                      value={keyword}
                    />
                    <span className="input-group-btn">
                      <button className="btn btn-primary" type="button"
                        onClick={() => {
                          handleSearch()
                        }}
                      ><i className="fa fa-search"></i></button>
                    </span>
                  </div>
                  {/* <!-- END SEARCH INPUT --> */}
                  <p>{status}</p>
                  
                  <div className="padding"></div>
                  
                  <div className="row">
                    {/* <!-- BEGIN ORDER RESULT --> */}
                    <div className="col-sm-6">
                      <div className="btn-group">
                        <a className="nav-item dropdown">
                            <button className="btn dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Sắp xếp </button>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="/course">Course</a></li>
                                <li><a className="dropdown-item" href="/blog">Blog</a></li>
                                <li><a className="dropdown-item" href="/markdown">Write Markdown</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Explore More</a></li>
                            </ul>
                        </a>
                      </div>
                    </div>
                    {/* <!-- END ORDER RESULT --> */}
                  </div>
                  
                  {/* <!-- BEGIN TABLE RESULT --> */}
                  {data.length > 0 &&
                    data.map((tab, id) => {
                      return (
                        <div className="table-responsive" key={id}>
                          <table className="table table-hover" style={{padding:"10px"}}>
                            <thead>{tab.search_type}</thead>
                            <tbody>
                              {tab.search_type !== 'user' &&
                                (tab.result).map((dt, id) => {
                                  return <ResultLessionCourse key={id} data={{"key":id, "id":dt.id, "name":dt.name, "description":dt.description, "number_of_views":dt.number_of_views, "course_type":dt.course_type, "category":tab.search_type}}/>
                                })
                              }
                              {tab.search_type === 'user' &&
                                (tab.result).map((dt, id) => {
                                  return <ResultUser key={id} data={{"key":id, "id":dt.id, "fullname":dt.fullname, "role":dt.role, "phone":dt.phone, "email":dt.email, "avatar":dt.avatar}}/>
                                })
                              }
                            </tbody>
                          </table>
                        </div>
                      )
                    })
                  }
                  {/* <!-- END TABLE RESULT --> */}
                  
                  {/* <!-- BEGIN PAGINATION --> */}
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>
                      <li className="page-item active"><a className="page-link" href="#">1</a></li>
                      <li className="page-item"><a className="page-link" href="#">2</a></li>
                      <li className="page-item"><a className="page-link" href="#">3</a></li>
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                  {/* <!-- END PAGINATION --> */}
                </div>
                {/* <!-- END RESULT --> */}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- END SEARCH RESULT --> */}
      </div>
    </div>
  )
}