import Calendar from 'react-calendar';
import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';

function Result(data) {

  const [info, setInfo] = useState(data.data)

  return (
    <tr onClick={() => {
      window.location.href = "/blog"
    }}>
      <td className="number text-center"></td>
      <td className="image"><i class="fa fa-picture-o fa-4x" aria-hidden="true"></i></td>
      <td className="product"><strong>{info.name}</strong><br/>{info.description}</td>
      <td className="date text-right">
        <div>{info.category}</div>
        <div>{info.date}</div>
      </td>
    </tr>
  )
}

export function Search() {

  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());

  return (
    <div className="container">
      <div className="row">
        {/* <!-- BEGIN SEARCH RESULT --> */}
        <div className="col-md-12">
          <div className="grid search">
            <div className="grid-body">
              <div className="row">
                {/* <!-- BEGIN FILTERS --> */}
                <div className="col-md-3">
                  <h2 className="grid-title"><i className="fa fa-filter"></i> Filters</h2>
                  <hr/>
                  
                  {/* <!-- BEGIN FILTER BY CATEGORY --> */}
                  <h4>By category:</h4>
                  <div className="checkbox">
                    <label><input type="checkbox" className="icheck"/> Application</label>
                  </div>
                  <div className="checkbox">
                    <label><input type="checkbox" className="icheck"/> Design</label>
                  </div>
                  <div className="checkbox">
                    <label><input type="checkbox" className="icheck"/> Desktop</label>
                  </div>
                  <div className="checkbox">
                    <label><input type="checkbox" className="icheck"/> Management</label>
                  </div>
                  <div className="checkbox">
                    <label><input type="checkbox" className="icheck"/> Mobile</label>
                  </div>
                  {/* <!-- END FILTER BY CATEGORY --> */}
                  
                  <div className="padding"></div>
                  
                  {/* <!-- BEGIN FILTER BY DATE --> */}
                  <h4>By date:</h4>
                  <div>
                    <Calendar onChange={setDateFrom} value={dateFrom} />
                  </div>
                  {/* <!-- END FILTER BY DATE --> */}
                  
                  <div className="padding"></div>
                  
                  {/* <!-- BEGIN FILTER BY PRICE --> */}
                  <h4>By price:</h4>
                  Between <div id="price1">$300</div> to <div id="price2">$800</div>
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
                  <h2><i className="fa fa-file-o"></i> Result</h2>
                  <hr/>
                  {/* <!-- BEGIN SEARCH INPUT --> */}
                  <div className="input-group">
                    <input type="text" className="form-control" defaultValue="web development"/>
                    <span className="input-group-btn">
                      <button className="btn btn-primary" type="button"><i className="fa fa-search"></i></button>
                    </span>
                  </div>
                  {/* <!-- END SEARCH INPUT --> */}
                  <p>Showing all results matching "web development"</p>
                  
                  <div className="padding"></div>
                  
                  <div className="row">
                    {/* <!-- BEGIN ORDER RESULT --> */}
                    <div className="col-sm-6">
                      <div className="btn-group">
                        <a className="nav-item dropdown">
                            <button className="btn dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Our Services</button>
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
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <tbody>
                        <Result data={{"name":"Pythonic", "description":"Gioi thieu ve Pythonic", "date":"22/5/2022", "link":"123", "category":"lession"}}/>
                        <Result data={{"name":"Pythonic", "description":"Gioi thieu ve Pythonic", "date":"22/5/2022", "link":"123", "category":"lession"}}/>
                        <Result data={{"name":"Pythonic", "description":"Gioi thieu ve Pythonic", "date":"22/5/2022", "link":"123", "category":"lession"}}/>
                        <Result data={{"name":"Pythonic", "description":"Gioi thieu ve Pythonic", "date":"22/5/2022", "link":"123", "category":"lession"}}/>
                        <Result data={{"name":"Pythonic", "description":"Gioi thieu ve Pythonic", "date":"22/5/2022", "link":"123", "category":"lession"}}/>
                        <Result data={{"name":"Pythonic", "description":"Gioi thieu ve Pythonic", "date":"22/5/2022", "link":"123", "category":"lession"}}/>
                        <Result data={{"name":"Pythonic", "description":"Gioi thieu ve Pythonic", "date":"22/5/2022", "link":"123", "category":"lession"}}/>
                        <Result data={{"name":"Pythonic", "description":"Gioi thieu ve Pythonic", "date":"22/5/2022", "link":"123", "category":"lession"}}/>
                        <Result data={{"name":"Pythonic", "description":"Gioi thieu ve Pythonic", "date":"22/5/2022", "link":"123", "category":"lession"}}/>
                    </tbody></table>
                  </div>
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