

function Notification() {
  return (
    <div className="p-3 d-flex align-items-center osahan-post-header">
        <div className="dropdown-list-image mr-3">
            <img className="rounded-circle" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
        </div>
        <div className="font-weight-bold mr-3" style={{flexGrow:"1", margin:"0px 20px"}}>
            <div className="mb-2">We found a job at askbootstr est...</div>
            <button type="button" className="btn btn-outline-success btn-sm">View Jobs</button>
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
            <div className="text-right text-muted pt-1">4d</div>
        </span>
    </div>
  )
}

export function Notifictions() {
  return (
    <div className="container">
      <div className="row">
          <div className="col-lg-3 left">
              <div className="box shadow-sm mb-3 rounded bg-white ads-box text-center">
                  <img src="https://bootdey.com/img/Content/avatar/avatar7.png" className="img-fluid" alt="Responsive image" />
                  <div className="p-3 border-bottom">
                      <h6 className="font-weight-bold text-dark">Notifications</h6>
                      <p className="mb-0 text-muted">You’re all caught up! Check back later for new notifications</p>
                  </div>
                  <div className="p-3">
                      <button type="button" className="btn btn-outline-success btn-sm pl-4 pr-4">View settings</button>
                  </div>
              </div>
              <div className="box mb-3 shadow-sm rounded bg-white profile-box text-center">
                  <div className="p-5">
                      <img src="https://bootdey.com/img/Content/avatar/avatar6.png" className="img-fluid" alt="Responsive image" />
                  </div>
                  <div className="p-3 border-top border-bottom">
                      <h5 className="font-weight-bold text-dark mb-1 mt-0">Envato</h5>
                      <p className="mb-0 text-muted">Melbourne, AU</p>
                  </div>
                  <div className="p-3">
                      <div className="d-flex align-items-top mb-2">
                          <p className="mb-0 text-muted">Posted</p>
                          <p className="font-weight-bold text-dark mb-0 mt-0 ml-auto">1 day ago</p>
                      </div>
                      <div className="d-flex align-items-top">
                          <p className="mb-0 text-muted">Applicant Rank</p>
                          <p className="font-weight-bold text-dark mb-0 mt-0 ml-auto">25</p>
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-lg-9 right">
              <div className="box shadow-sm rounded bg-white mb-3">
                  <div className="box-title border-bottom p-3">
                      <h6 className="m-0">Recent</h6>
                  </div>
                  <div className="box-body p-0">
                      <Notification/>
                      <Notification/>
                      <Notification/>
                  </div>
              </div>
              <div className="box shadow-sm rounded bg-white mb-3">
                  <div className="box-title border-bottom p-3">
                      <h6 className="m-0">Earlier</h6>
                  </div>
                  <div className="box-body p-0">
                      <Notification/>
                      <Notification/>
                      <Notification/>
                      <Notification/>
                      <Notification/>
                      <Notification/>
                      <Notification/>
                      <Notification/>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}