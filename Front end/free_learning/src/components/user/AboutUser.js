

export function AboutUser(data) {
  return (
    <div className="tab-pane" id="about">
      <div className="row">
          <div className="col-sm-12">
              <div className="card">
                  <div className="card-header">
                      <h5 className="card-header-text">Thông tin cơ bản </h5>
                  </div>
                  <div className="card-block">
                      <div id="view-info" className="row">
                          <div className="col-lg-6 col-md-12">
                              <form>
                                  <table className="table table-responsive m-b-0">
                                      <tbody>
                                          <tr>
                                              <th className="social-label b-none p-t-0">Tên đầy đủ 
                                              </th>
                                              <td className="social-user-name b-none p-t-0 text-muted">{data.name}</td>
                                          </tr>
                                          <tr>
                                              <th className="social-label b-none">Chức vụ </th>
                                              <td className="social-user-name b-none text-muted">{data.role}</td>
                                          </tr>
                                          <tr>
                                              <th className="social-label b-none">Điện thoại </th>
                                              <td className="social-user-name b-none text-muted">{data.phone}</td>
                                          </tr>
                                          <tr>
                                              <th className="social-label b-none">Email</th>
                                              <td className="social-user-name b-none text-muted">{data.email}</td>
                                          </tr>
                                          <tr>
                                              <th className="social-label b-none p-b-0">Giới thiệu </th>
                                              <td className="social-user-name b-none p-b-0 text-muted">{data.bio}</td>
                                          </tr>
                                      </tbody>
                                  </table>
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