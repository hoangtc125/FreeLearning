import logo from '../logo.svg';


export function Root() {
  return (
    // <header classNameName="App-header">
    //   <img src={logo} classNameName="App-logo" alt="logo" />
    //   <p>
    //     Edit <code>src/App.js</code> and save to reload.
    //   </p>
    //   <a
    //     classNameName="App-link"
    //     href="https://reactjs.org"
    //     target="_blank"
    //     rel="noopener noreferrer"
    //   >
    //     Learn React
    //   </a>
    // </header>
    <section id="testimonial-slider" className="App-header">
      <div className="container">
          <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
              <div className="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div className="col-sm-8 mx-auto">
                  <div className="carousel-inner text-center text-white py-4">
                      <div className="carousel-item active" data-bs-interval="10000">
                          <div className="shadow">
                              <img style={{maxHeight:"60vh", minHeight:"60px"}} src="https://video.fpnh22-3.fna.fbcdn.net/v/t39.30808-6/240596486_1264840270623843_4582448100876258519_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=e3f864&_nc_ohc=WIEbCj33K80AX-ZU-Oc&tn=YbfprhnIqnGzsA-O&_nc_ht=video.fpnh22-3.fna&oh=00_AT-N8OauPTL9JzBr0MRYSCh6GxU41AWbZY6eOxaXOzx6Vg&oe=6290470F" className="img-fluid" alt="testimonial slider"/>
                          </div>
                          <div className="slider-caption mt-3">
                              <p className="fs-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                              <figcaption className="blockquote-footer mt-3 text-white fs-5"><cite>Trần Công Hoàng </cite></figcaption>
                          </div>
                      </div>
                      <div className="carousel-item" data-bs-interval="10000">
                          <div className="shadow">
                              <img style={{maxHeight:"60vh", minHeight:"60px"}} src="https://video.fpnh22-4.fna.fbcdn.net/v/t39.30808-6/257731232_1313909815716888_3818428840467093702_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=h2cmUEuCU-oAX8V-7x4&_nc_ht=video.fpnh22-4.fna&oh=00_AT_JfH02dnC8OMCq9b9VC_93_L8WRhdGBtHBoLsot_aSKg&oe=62901D1A" classNameName="App-logo" alt="logo" />
                          </div>
                          <div className="slider-caption mt-3">
                              <p className="fs-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                              <figcaption className="blockquote-footer mt-3 text-white fs-5"><cite>Trần Công Hoàng </cite></figcaption>
                          </div>
                      </div>
                      <div className="carousel-item" data-bs-interval="10000">
                          <div className="shadow">
                              <img style={{maxHeight:"60vh", minHeight:"60px"}} src="https://video.fpnh22-4.fna.fbcdn.net/v/t39.30808-6/257731232_1313909815716888_3818428840467093702_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=h2cmUEuCU-oAX8V-7x4&_nc_ht=video.fpnh22-4.fna&oh=00_AT_JfH02dnC8OMCq9b9VC_93_L8WRhdGBtHBoLsot_aSKg&oe=62901D1A" classNameName="App-logo" alt="logo" />
                          </div>
                          <div className="slider-caption mt-3">
                              <p className="fs-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                              <figcaption className="blockquote-footer mt-3 text-white fs-5"><cite>Trần Công Hoàng </cite></figcaption>
                          </div>
                      </div>
                  </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
              </button>
          </div>
      </div>
  </section>
  )
}