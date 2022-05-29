

export function Footer() {
  return (
    <footer className="nb-footer">
      <div className="container">
      <div className="row">
      <div className="col-sm-12">
      <div className="about">
        <img src="images/logo.png" className="img-responsive center-block" alt=""/>
        <p>FREE LEARNING - Nền tảng chia sẻ và hỏi đáp kiến thức hoàn toàn miễn phí</p>
        <p>Sản phẩm của môn học Project II học kì 20212 tại Trường Công nghệ Thông tin và Truyền thông, Đại học Bách Khoa Hà Nội</p>
        <p>Tác giả: Trần Công Hoàng</p>

        <div className="social-media">
          <ul className="list-inline">
            <li><a href="https://www.facebook.com/hoang2k1111" title=""><i className="fa fa-facebook fa"></i>Facebook</a></li>
            <li><a href="https://github.com/hoangtc125" title=""><i className="fa fa-github fa"></i>GitHub</a></li>
            <li><a href="https://www.instagram.com/hoangtc125/" title=""><i className="fa fa-instagram fa"></i>Instagram</a></li>
            <li><a href="https://www.linkedin.com/in/hoang2k1111/" title=""><i className="fa fa-linkedin fa"></i>Linkedin</a></li>
          </ul>
        </div>
      </div>
      </div>

      <div className="col-md-3 col-sm-6">
      <div className="footer-info-single">
        <h2 className="title">Trợ giúp </h2>
        <ul className="list-unstyled">
          <li><a href="https://www.facebook.com/hoang2k1111" title=""><i className="fa fa-angle-double-right"></i> Facebook</a></li>
          <li><a href="https://github.com/hoangtc125" title=""><i className="fa fa-angle-double-right"></i> GitHub</a></li>
          <li><a href="https://www.instagram.com/hoangtc125/" title=""><i className="fa fa-angle-double-right"></i> Instagram</a></li>
          <li><a href="https://www.linkedin.com/in/hoang2k1111/" title=""><i className="fa fa-angle-double-right"></i> Linkedin</a></li>
        </ul>
      </div>
      </div>

      <div className="col-md-3 col-sm-6">
      <div className="footer-info-single">
        <h2 className="title">Thông tin đối tác </h2>
        <ul className="list-unstyled">
          <li><a href="https://hust.edu.vn/" title=""><i className="fa fa-angle-double-right"></i> Đại học Bách Khoa Hà Nội </a></li>
          <li><a href="http://www.nextbootstrap.com/" title=""><i className="fa fa-angle-double-right"></i> Bootstrap 5 </a></li>
          <li><a href="https://reactjs.org/" title=""><i className="fa fa-angle-double-right"></i> React JS </a></li>
          <li><a href="https://fastapi.tiangolo.com/" title=""><i className="fa fa-angle-double-right"></i> FastAPI </a></li>
        </ul>
      </div>
      </div>

      <div className="col-md-3 col-sm-6">
      <div className="footer-info-single">
        <h2 className="title">Điều khoản & Bảo mật </h2>
        <ul className="list-unstyled">
          <li><a href="/404" title=""><i className="fa fa-angle-double-right"></i> Hướng dẫn sử dụng </a></li>
          <li><a href="/404" title=""><i className="fa fa-angle-double-right"></i> Chính sách bảo mật </a></li>
          <li><a href="/404" title=""><i className="fa fa-angle-double-right"></i> Hỏi đáp </a></li>
        </ul>
      </div>
      </div>

      <div className="col-md-3 col-sm-6">
      <div className="footer-info-single">
        <h2 className="title">Ủng hộ </h2>
        <p>Các bạn có thể ủng hộ chúng tôi qua số 105870479887 tại ngân hàng ViettinBank </p>
        
      </div>
      </div>
      </div>
      </div>

      <section className="copyright">
      <div className="container">
      <div className="row">
      <div className="col-sm-6">
      <p>Copyright © 2022. Tran Cong Hoang.</p>
      </div>
      <div className="col-sm-6"></div>
      </div>
      </div>
      </section>
    </footer>
  )
}