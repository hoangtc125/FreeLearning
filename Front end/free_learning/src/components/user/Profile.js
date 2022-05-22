import { Link } from "react-router-dom"
import { Timeline } from "./Timeline"
import { AboutUser } from "./AboutUser"
import { useState } from "react"
import { Followers } from "./Followers"

export function Profile() {

  const [view, setView] = useState("POSTS")

  return (
    <div className="container">
      <div className="row">
          <div className="col-md-12">
            <div id="content" className="content content-full-width">
                <div className="profile">
                  <div className="profile-header">
                      <div className="profile-header-cover"></div>
                      <div className="profile-header-content">
                        <div className="profile-header-img">
                            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt=""/>
                        </div>
                        <div className="profile-header-info">
                            <h4 className="m-t-10 m-b-5">Tran Cong Hoang</h4>
                            <p className="m-b-10">UXUI + Frontend Developer</p>
                            <Link to="/user/edit" className="btn btn-sm btn-info mb-2">Edit Profile</Link>
                        </div>
                      </div>
                      <ul className="profile-header-tab nav nav-tabs">
                        <li className="nav-item"><a href="#profile-post" className="nav-link" data-toggle="tab"
                        onClick={() => {
                          setView("POSTS")
                        }}
                        >POSTS</a></li>
                        <li className="nav-item"><a href="#profile-about" className="nav-link" data-toggle="tab"
                        onClick={() => {
                          setView("ABOUT")
                        }}
                        >ABOUT</a></li>
                        <li className="nav-item"><a href="#profile-friends" className="nav-link" data-toggle="tab"
                        onClick={() => {
                          setView("FOLLOWERS")
                        }}
                        >FOLLOWERS</a></li>
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
                {view === "ABOUT" && <AboutUser/>}
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