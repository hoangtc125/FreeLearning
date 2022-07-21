import { useEffect, useState } from "react"
import logo from '../../logo.svg';

function Notification(data) {

    const [info, setInfo] = useState(data.data)
    const [date, setDate] = useState(0)

    useEffect(() => {
        setDate(new Date(data.data.created_at * 1000).toLocaleString())
    }, [data])

    function handleReadNotification(e) {
        e.preventDefault()
        window.localStorage.setItem("FREE_LEARNING_ID_FOUND", String(info.href).split("=")[1])
        window.location.href = info.href
    }

  return (
      <a href="#" style={{textDecoration:"none"}} onClick={(e) => handleReadNotification(e)}>
        <div className="p-3 d-flex align-items-center osahan-post-header">
            {/* <div className="dropdown-list-image mr-3"> */}
              {/* <img src={logo} className="App-logo" style={{height:"fit-content", width:"fit-content", marginTop:"6px"}} alt=""/> */}
            {/* </div> */}
            <div className="font-weight-bold mr-3" style={{flexGrow:"1", margin:"0px "}}>
                <div className="mb-2">{info.content}</div>
                {!info.is_read &&
                    <button type="button" className="btn btn-outline-success btn-sm" disabled>{date} <i className="fa fa-clock-o" aria-hidden="true"></i></button>
                }
            </div>
            <span className="ml-auto mb-auto">
                <div className="btn-group">
                <button type="button" className="btn btn-light btn-sm rounded" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="mdi mdi-dots-vertical"></i>
                </button>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><button className="dropdown-item" type="button"><i className="mdi mdi-delete"></i> Delete</button></li>
                    <li><button className="dropdown-item" type="button"><i className="mdi mdi-close"></i> Turn Off</button></li>
                </ul>
                </div>
                <br />
            </span>
        </div>
      </a>
  )
}

export function Notifications(data) {

    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        setNotifications(data.data)
    }, [data])

  return (
    <div className="container">
      <div className="row" style={{minWidth:"30vw"}}>
          <div className="col-lg-9 right" style={{height:"60vh", overflowY:"auto", width:"100%"}}>
              <div className="box shadow-sm rounded bg-white mb-3">
                  <div className="box-title border-bottom p-3">
                      <h6 className="m-0">Notifications</h6>
                  </div>
                  <div className="box-body p-0">
                      {notifications && 
                        notifications.map((notification, id) => {
                            return <Notification key={id} data={{"content": notification.content, "href": notification.href, "created_at": notification.created_at, "is_read": notification.is_read}}/>
                        })
                      }
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}