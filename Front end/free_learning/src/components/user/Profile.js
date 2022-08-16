import { Link } from "react-router-dom"
import { Timeline } from "./Timeline"
import { AboutUser } from "./AboutUser"
import { useState } from "react"
import { Followers } from "./Followers"
import logo from '../../logo.svg';
import { useEffect } from "react"
import * as API from '../../constants/api_config'
import { Loader } from "../Loader"
import { UserLessions } from "./UserLessions"

export function Profile(data) {

  const [view, setView] = useState("POSTS")
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [role, setRole] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")
  const [avatar, setAvatar] = useState("")
  const [followers, setFollowers] = useState(0)
  const [isMe, setIsMe] = useState(true)
  const [checkFollowed, setCheckFollowed] = useState(false)
  const [load, setLoad] = useState(false)
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    setLoad(true)
    let _path = API.DOMAIN + data.api
    if (data.api != '/api/user/me') {
      _path = API.DOMAIN + data.api + document.URL.substring(document.URL.lastIndexOf("/") + 1)
    }
    fetch(_path, {
      method: 'POST', // or 'PUT'
      headers: {
        'accept': 'application/json',
        'Authorization': window.localStorage.getItem("FREE_LEARNING_TOKEN"),
      },
      credentials: "same-origin",
      // mode: 'no-cors'
    })
    .then(response => {
      return response.json()})
    .then(dt => {
      if(dt?.detail) {
        alert(dt.detail)
      } else {
        setUsername(dt.data[0].username)
        setName(dt.data[0].fullname || "")
        setPhoneNumber(dt.data[0].phone || "")
        setEmail(dt.data[0].email || "")
        setRole(dt.data[0].role || "")
        setBio(dt.data[0].profile || "")
        setAvatar(dt.data[0].avatar || "string")
        if (window.localStorage.getItem("FREE_LEARNING_USERNAME") === dt.data[0].username) {
          setIsMe(true)
          setFollowers(0)
        } else {
          setIsMe(false)
        }
        if (dt.data[1]) {
          if (dt.data[1].id === window.localStorage.getItem("FREE_LEARNING_USERNAME")) {
            setIsMe(true)
            setFollowers(dt.data[1].followers.length)
          } else {
            if (dt.data[1].followers.includes(window.localStorage.getItem("FREE_LEARNING_USERNAME"))) {
              setCheckFollowed(true)
            } else {
              setCheckFollowed(false)
            }
          }
        }
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    const user_id = data.api.includes("me") ? window.localStorage.getItem("FREE_LEARNING_USERID") : window.localStorage.getItem("FREE_LEARNING_ID_FOUND")
    fetch(API.DOMAIN + API.GET_STATUS + user_id, {
      method: 'GET', // or 'PUT'
      headers: {
        'accept': 'application/json',
      },
      credentials: "same-origin",
      // mode: 'no-cors'
    })
    .then(response => {
      return response.json()})
    .then(dt => {
      setTimeline(dt.data)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    setLoad(false)
  }, [data])

  function handleSubcribe(e) {
    e.preventDefault()
    if (!window.localStorage.getItem("FREE_LEARNING_USERNAME")) {
      alert("Hãy đăng nhập để thực hiện chức năng này ")
      return
    }
    fetch(API.DOMAIN + API.SUBCRIBE + username, {
      method: 'POST', // or 'PUT'
      headers: {
        'accept': 'application/json',
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
        alert("Successfull !!!")
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <div className="container">
      {load && <Loader/>}
      <div className="row">
          <div className="col-md-12">
            <div id="content" className="content content-full-width">
                <div className="profile">
                  <div className="profile-header">
                      <div className="profile-header-cover"></div>
                      <div className="profile-header-content">
                        <div className="profile-header-img" style={{background:"rgba(0,0,0,0)"}}>
                          {avatar === "string" &&
                            <img src={logo} className="App-logo" style={{height:"fit-content", width:"fit-content", marginTop:"16px"}} alt=""/>
                          }
                          {avatar !== "string" &&
                            <a href="#" data-bs-target="#ModalAvatar" data-bs-toggle="modal" data-bs-dismiss="modal">
                              <img className="" src={avatar} style={{maxHeight:"110px", maxWidth:"110px", cursor:"pointer"}}/>
                            </a>
                          }
                          <div className="modal fade" id="ModalAvatar" tabIndex="-1" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                  <img className="" src={avatar} style={{top:"50%", maxHeight:"70vh", maxWidth:"70vw"}}/>
                              </div>
                          </div>
                        </div>
                        </div>
                        <div className="profile-header-info">
                            <h4 className="m-t-10 m-b-5">{name}</h4>
                            <p className="m-b-10">{role}</p>
                            {isMe && 
                              <p className="m-b-10">{followers} người theo dõi </p>
                            }
                            {!isMe &&
                              <a href="" id="afollow" onClick={(e) => {
                                handleSubcribe(e)
                                setCheckFollowed(check => !check)
                              }} className="btn btn-sm btn-info mb-2">
                                {checkFollowed &&
                                  "Followed"
                                }
                                {!checkFollowed &&
                                  "Follow"
                                }
                              </a>
                            }
                        </div>
                      </div>
                      <ul className="profile-header-tab nav nav-tabs">
                        <li className="nav-item"><a href="#profile-post" className="nav-link" data-toggle="tab"
                        onClick={() => {
                          setView("POSTS")
                        }}
                        >Bài viết </a></li>
                        <li className="nav-item"><a href="#profile-about" className="nav-link" data-toggle="tab"
                        onClick={() => {
                          setView("ABOUT")
                        }}
                        >Giới thiệu </a></li>
                        <li className="nav-item"><a href="#profile-friends" className="nav-link" data-toggle="tab"
                        onClick={() => {
                          setView("FOLLOWERS")
                        }}
                        >Người theo dõi </a></li>
                        <li className="nav-item"><a href="#profile-lessions" className="nav-link" data-toggle="tab"
                        onClick={() => {
                          setView("LESSIONS")
                        }}
                        >Các bài viết </a></li>
                      </ul>
                  </div>
                </div>
                {view === "POSTS" &&
                <div className="profile-content"  style={{display:"flex", padding:"0"}}>
                  <div className="tab-content p-0">
                      <div className="tab-pane fade active show" id="profile-post" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                        {isMe &&
                          <div className="timeline-comment-box" style={{minWidth:"90vw", background:"#fff", padding:"30px 40px 50px", display:"flex"}}>
                            <div className="user">
                              <img src={avatar} className="" style={{height:"fit-content", width:"fit-content", objectFit:"cover", marginTop:"6px"}} alt=""/></div>
                              <div className="input" style={{flexGrow:"1", padding:"0 20px", marginLeft:"-10px"}}>
                                  <form action="">
                                    <div className="input-group">
                                        <input type="text" className="form-control rounded-corner" placeholder="Bạn đang nghĩ gì?" style={{borderRadius:"999px"}}/>
                                        <span className="input-group-btn p-l-10">
                                        </span>
                                    </div>
                                  </form>
                              </div>
                              <button className="btn btn-primary profile-button">Post</button>
                          </div>
                        }
                        <ul className="timeline" style={{width:"100%"}}>
                          {!!timeline &&
                            timeline.map((item, id) => {
                              return <Timeline key={id} avatar={avatar} name={name} timeline={item}/>
                            })
                          }
                        </ul>
                      </div>
                  </div>
                </div>
                }
                {view === "ABOUT" && <AboutUser name={name} role={role} email={email} phone={phoneNumber} bio={bio}/>}
                {view === "FOLLOWERS" &&
                <div className="tab-pane" id="friends">
                  <Followers username={username}/>
                </div>
                }
                {view === "LESSIONS" &&
                <UserLessions username={username}/>
                }
            </div>
          </div>
      </div>
    </div>
  )
}