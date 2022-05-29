import { Link } from "react-router-dom";


export function Error404() {
  return (
    <div className="page-not-found pt-5">
      <div className="bg-light shadow" style={{color:"#ccc"}}>
          <h2>4<i className="fa fa-bug"></i>4</h2>
          <h3 className="mt-4">Opps! Trang bạn tìm kiếm không tồn tại </h3>
          <p>Hãy đảm bảo bạn nhập đúng đường dẫn và không có lỗi xảy ra<br/>Nếu vẫn không tìm được trang bạn muốn, hãy thử: </p>
          <div className="mt-5" style={{display: "flex", justifyContent: "space-evenly"}}>
              <button type="button" style={{padding:"10px"}} className="btn m-2 m-md-0 btn-warning"><i className="fa fa-house-door-fill"></i> 
                <Link to="/" className="white-custom" style={{textDecoration:"none", color:"#333"}}>Quay về trang chủ </Link>
              </button>
              <button type="button" style={{padding:"10px"}} className="btn m-2 m-md-0 btn-success"><i className="fa fa-person-lines-fill"></i> 
                <Link to="/contactUs" className="white-custom" style={{textDecoration:"none"}}>Liên hệ với chúng tôi </Link>
              </button>
          </div>
      </div>
    </div>
  )
}