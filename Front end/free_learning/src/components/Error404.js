import { Link } from "react-router-dom";


export function Error404() {
  return (
    <div className="page-not-found pt-5">
      <div className="bg-light shadow">
          <h2>4<i className="fa fa-bug"></i>4</h2>
          <h3 className="mt-4">Opps! Page Not Found</h3>
          <p>Lorem Ipsum is simply dummy text of the printing and<br/>typesetting industry.</p>
          <div className="mt-5">
              <button type="button" className="btn m-2 m-md-0 btn-warning"><i className="fa fa-house-door-fill"></i> 
                <Link to="/" className="white-custom">Back Home</Link>
              </button>
              <button type="button" className="btn m-2 m-md-0 btn-success"><i className="fa fa-person-lines-fill"></i> 
                <Link to="/contactUs" className="white-custom">Contact Us</Link>
              </button>
          </div>
      </div>
    </div>
  )
}