import { Link } from "react-router-dom"
import { Timeline } from "./Timeline"
import { AboutUser } from "./AboutUser"
import { useState } from "react"
import { Followers } from "./Followers"
import logo from '../../logo.svg';
import { useEffect } from "react"
import * as API from '../../constants/api_config'
import { Loader } from "../Loader"

export function Profile(data) {

  const [view, setView] = useState("POSTS")
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [role, setRole] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")
  const [avatar, setAvatar] = useState("")
  const [load, setLoad] = useState(false)

  useEffect(() => {
    setLoad(true)
    fetch(API.DOMAIN + data.api, {
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
        setName(data.data.fullname || "")
        setPhoneNumber(data.data.phone || "")
        setEmail(data.data.email || "")
        setRole(data.data.role || "")
        setBio(data.data.profile || "")
        setAvatar(data.data.avatar || "string")
        setLoad(false)
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, [data])

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
                            <img className="" src={avatar} style={{maxHeight:"110px", maxWidth:"110px"}}/>
                          }
                        </div>
                        <div className="profile-header-info">
                            <h4 className="m-t-10 m-b-5">{name}</h4>
                            <p className="m-b-10">{role}</p>
                            <Link to="/user/edit" className="btn btn-sm btn-info mb-2">Follow</Link>
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
                      </ul>
                  </div>
                </div>
                {view === "POSTS" &&
                <div className="profile-content">
                  <div className="tab-content p-0">
                      <div className="tab-pane fade active show" id="profile-post">
                        <ul className="timeline">
                          <Timeline/>
                          <Timeline/>
                          <Timeline/>
                          <Timeline/>
                          <Timeline/>
                        </ul>
                      </div>
                  </div>
                </div>
                }
                {view === "ABOUT" && <AboutUser name={name} role={role} email={email} phone={phoneNumber} bio={bio}/>}
                {view === "FOLLOWERS" &&
                <div className="tab-pane" id="friends">
                  <div className="row">
                    <Followers/>
                    <Followers/>
                    <Followers/>
                    <Followers/>
                    <Followers/>
                  </div>
                </div>
                }
            </div>
          </div>
      </div>
    </div>
  )
}