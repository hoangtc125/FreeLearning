import logo from '../logo.svg';
import {avatar, lock, cover} from '../images'
import { Home } from './Home';

export function Root() {
  return (
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
                              <img style={{maxHeight:"60vh", minHeight:"60px"}} src={avatar} className="img-fluid" alt="testimonial slider"/>
                          </div>
                          <div className="slider-caption mt-3">
                              <p className="fs-5">Một cuốn sách thực sự hay nên đọc trong tuổi trẻ, rồi đọc lại khi đã trưởng thành, và một nửa lúc tuổi già, giống như một tòa nhà đẹp nên được chiêm ngưỡng trong ánh bình minh, nắng trưa và ánh trăng.</p>
                              <figcaption className="blockquote-footer mt-3 text-white fs-5"><cite>Trần Công Hoàng </cite></figcaption>
                          </div>
                      </div>
                      <div className="carousel-item" data-bs-interval="10000">
                          <div className="shadow">
                              <img style={{maxHeight:"60vh", minHeight:"60px"}} src={lock} alt="logo" />
                          </div>
                          <div className="slider-caption mt-3">
                              <p className="fs-5">Những gì sách dạy chúng ta cũng giống như lửa. Chúng ta lấy nó từ nhà hàng xóm, thắp nó trong nhà ta, đem nó truyền cho người khác và nó trở thành tài sản của tất cả mọi người.</p>
                              <figcaption className="blockquote-footer mt-3 text-white fs-5"><cite>Trần Công Hoàng </cite></figcaption>
                          </div>
                      </div>
                      <div className="carousel-item" data-bs-interval="10000">
                          <div className="shadow">
                              <img style={{maxHeight:"60vh", minHeight:"60px"}} src={cover} alt="logo" />
                          </div>
                          <div className="slider-caption mt-3">
                              <p className="fs-5">Cuốn sách tốt nhất cho bạn là cuốn sách nói nhiều nhất với bạn vào lúc bạn đọc nó. Tôi không nói tới cuốn sách cho bạn nhiều bài học nhất mà là cuốn sách nuôi dưỡng tâm hồn bạn. Và điều đó phụ thuộc vào tuổi tác, trải nghiệm, nhu cầu về tâm lý và tinh thần.</p>
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
      <Home/>
  </section>
  )
}