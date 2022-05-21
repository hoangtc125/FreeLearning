

export function AboutUs() {
  return (
    <div className="App-header profile-card text-center shadow bg-light p-4 my-5 rounded-3" id="aboutUs">
        <div className="profile-photo shadow">
            <img src="https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/257731232_1313909815716888_3818428840467093702_n.jpg?stp=dst-jpg_p240x240&_nc_cat=108&ccb=1-5&_nc_sid=7206a8&_nc_ohc=yTfd7iUUYYUAX9oqEc6&_nc_ht=scontent.fhan2-3.fna&oh=00_AT_BGNyCPZZCNTYF8OF41kh9fOXXZ1Q0iqSm8ZR3cRUvqw&oe=626B1C1C" alt="profile Photo" className="img-fluid"/>
        </div>
        <h3 className="pt-3 text-dark">Tran Cong Hoang</h3>
        <p className="text-secondary">Web Developer & Designer</p>
        <div className="social-links">
            <ul>
                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>                            
            </ul>
        </div>
    </div>
  )
}