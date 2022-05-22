

export function AboutUser() {
  return (
    <div className="tab-pane" id="about">
      <div className="row">
          <div className="col-sm-12">
              <div className="card">
                  <div className="card-header">
                      <h5 className="card-header-text">Basic Information</h5>
                  </div>
                  <div className="card-block">
                      <div id="view-info" className="row">
                          <div className="col-lg-6 col-md-12">
                              <form>
                                  <table className="table table-responsive m-b-0">
                                      <tbody>
                                          <tr>
                                              <th className="social-label b-none p-t-0">Full Name
                                              </th>
                                              <td className="social-user-name b-none p-t-0 text-muted">Josephine Villa</td>
                                          </tr>
                                          <tr>
                                              <th className="social-label b-none">Gender</th>
                                              <td className="social-user-name b-none text-muted">Female</td>
                                          </tr>
                                          <tr>
                                              <th className="social-label b-none">Birth Date</th>
                                              <td className="social-user-name b-none text-muted">October 25th, 1990</td>
                                          </tr>
                                          <tr>
                                              <th className="social-label b-none">Martail Status</th>
                                              <td className="social-user-name b-none text-muted">Single</td>
                                          </tr>
                                          <tr>
                                              <th className="social-label b-none p-b-0">Location</th>
                                              <td className="social-user-name b-none p-b-0 text-muted">New York, USA</td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </form>
                          </div>
                      </div>
                      
                  </div>
              </div>
          </div>
          <div className="col-sm-12">
              <div className="card">
                  <div className="card-header">
                      <h5 className="card-header-text">Contact Information</h5>
                  </div>
                  <div className="card-block">
                      <div id="contact-info" className="row">
                          <div className="col-lg-6 col-md-12">
                              <table className="table table-responsive m-b-0">
                                  <tbody>
                                      <tr>
                                          <th className="social-label b-none p-t-0">Mobile Number</th>
                                          <td className="social-user-name b-none p-t-0 text-muted">eg. (0123) - 4567891</td>
                                      </tr>
                                      <tr>
                                          <th className="social-label b-none">Email Address</th>
                                          <td className="social-user-name b-none text-muted">test@gmail.com</td>
                                      </tr>
                                      <tr>
                                          <th className="social-label b-none">Twitter</th>
                                          <td className="social-user-name b-none text-muted">@phonixcoded</td>
                                      </tr>
                                      <tr>
                                          <th className="social-label b-none p-b-0">Skype</th>
                                          <td className="social-user-name b-none p-b-0 text-muted">@phonixcoded demo</td>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>
                      </div>
                      <div id="edit-contact-info" className="row" style={{display:"none"}}>
                          <div className="col-lg-12 col-md-12">
                              <form>
                                  <div className="input-group">
                                      <input type="text" className="form-control" placeholder="Mobile number"/>
                                  </div>
                                  <div className="input-group">
                                      <input type="text" className="form-control" placeholder="Email address"/>
                                  </div>
                                  <div className="input-group">
                                      <input type="text" className="form-control" placeholder="Twitter id"/>
                                  </div>
                                  <div className="input-group">
                                      <input type="text" className="form-control" placeholder="Skype id"/>
                                  </div>
                                  <div className="text-center m-t-20">
                                      <a href="javascript:;" id="contact-save" className="btn btn-primary waves-effect waves-light m-r-20">Save</a>
                                      <a href="javascript:;" id="contact-cancel" className="btn btn-default waves-effect waves-light">Cancel</a>
                                  </div>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-sm-12">
              <div className="card">
                  <div className="card-header">
                      <h5 className="card-header-text">Work</h5>
                  </div>
                  <div className="card-block">
                      <div id="work-info" className="row">
                          <div className="col-lg-6 col-md-12">
                              <table className="table table-responsive m-b-0">
                                  <tbody>
                                      <tr>
                                          <th className="social-label b-none p-t-0">Occupation &nbsp; &nbsp; &nbsp;
                                          </th>
                                          <td className="social-user-name b-none p-t-0 text-muted">Developer</td>
                                      </tr>
                                      <tr>
                                          <th className="social-label b-none">Skills</th>
                                          <td className="social-user-name b-none text-muted">C#, Javascript, Anguler</td>
                                      </tr>
                                      <tr>
                                          <th className="social-label b-none">Jobs</th>
                                          <td className="social-user-name b-none p-b-0 text-muted">#</td>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>
                      </div>
                      <div id="edit-contact-work" className="row" style={{display:"none"}}>
                          <div className="col-lg-12 col-md-12">
                              <form>
                                  <div className="input-group">
                                      <select id="occupation" className="form-control">
                                          <option value=""> Select occupation </option>
                                          <option value="married">Developer</option>
                                          <option value="unmarried">Web Design</option>
                                      </select>
                                  </div>
                                  <div className="input-group">
                                      <select id="skill" className="form-control">
                                          <option value=""> Select Skills </option>
                                          <option value="married">C# &amp; .net</option>
                                          <option value="unmarried">Angular</option>
                                      </select>
                                  </div>
                                  <div className="input-group">
                                      <select id="job" className="form-control">
                                          <option value=""> Select Job </option>
                                          <option value="married">#</option>
                                          <option value="unmarried">Other</option>
                                      </select>
                                  </div>
                                  <div className="text-center m-t-20">
                                      <a href="javascript:;" id="work-save" className="btn btn-primary waves-effect waves-light m-r-20">Save</a>
                                      <a href="javascript:;" id="work-cancel" className="btn btn-default waves-effect waves-light">Cancel</a>
                                  </div>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  )
}