import { Link } from "react-router-dom"
import { Timeline } from "./Timeline"

export function Profile() {
  return (
    <div className="container">
      <div className="row">
          <div className="col-md-12">
            <div id="content" className="content content-full-width">
                {/* <!-- begin profile --> */}
                <div className="profile">
                  <div className="profile-header">
                      {/* <!-- BEGIN profile-header-cover --> */}
                      <div className="profile-header-cover"></div>
                      {/* <!-- END profile-header-cover --> */}
                      {/* <!-- BEGIN profile-header-content --> */}
                      <div className="profile-header-content">
                        {/* <!-- BEGIN profile-header-img --> */}
                        <div className="profile-header-img">
                            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt=""/>
                        </div>
                        {/* <!-- END profile-header-img --> */}
                        {/* <!-- BEGIN profile-header-info --> */}
                        <div className="profile-header-info">
                            <h4 className="m-t-10 m-b-5">Tran Cong Hoang</h4>
                            <p className="m-b-10">UXUI + Frontend Developer</p>
                            <Link to="/user/edit" className="btn btn-sm btn-info mb-2">Edit Profile</Link>
                        </div>
                        {/* <!-- END profile-header-info --> */}
                      </div>
                      {/* <!-- END profile-header-content --> */}
                      {/* <!-- BEGIN profile-header-tab --> */}
                      <ul className="profile-header-tab nav nav-tabs">
                        <li className="nav-item"><a href="#profile-post" className="nav-link active show" data-toggle="tab">POSTS</a></li>
                        <li className="nav-item"><a href="#profile-about" className="nav-link" data-toggle="tab">ABOUT</a></li>
                        <li className="nav-item"><a href="#profile-photos" className="nav-link" data-toggle="tab">PHOTOS</a></li>
                        <li className="nav-item"><a href="#profile-videos" className="nav-link" data-toggle="tab">VIDEOS</a></li>
                        <li className="nav-item"><a href="#profile-friends" className="nav-link" data-toggle="tab">FRIENDS</a></li>
                      </ul>
                      {/* <!-- END profile-header-tab --> */}
                  </div>
                </div>
                {/* <!-- end profile --> */}
                {/* <!-- begin profile-content --> */}
                <div className="profile-content">
                  {/* <!-- begin tab-content --> */}
                  <div className="tab-content p-0">
                      {/* <!-- begin #profile-post tab --> */}
                      <div className="tab-pane fade active show" id="profile-post">
                        {/* <!-- begin timeline --> */}
                        <ul className="timeline">
                          <Timeline/>
                          <Timeline/>
                          <Timeline/>
                          <Timeline/>
                          <Timeline/>
                        </ul>
                        {/* <!-- end timeline --> */}
                      </div>
                      {/* <!-- end #profile-post tab --> */}
                  </div>
                  {/* <!-- end tab-content --> */}
                </div>
                {/* <!-- end profile-content --> */}
            </div>
          </div>
      </div>
    </div>
  )
}