import {useState} from "react"
import { avatar } from "../images"

export function ContactUs() {

  const [nameMail, setNameMail] = useState("")
  const [emailMail, setEmailMail] = useState("")
  const [subjectMail, setSubjectMail] = useState("")
  const [messageMail, setMessageMail] = useState("")

  return (
    <section className="contact-us">
      <div className="container">
          <div className="row">
              <div className="col-md-7">
                  <div className="section-title">
                      <h2>Liên hệ với tôi </h2>
                      <p><b>Điền đầy đủ thông tin của bạn theo mẫu dưới đây. </b>Chúng tôi sẽ nhận và tiếp thu góp ý của bạn </p>
                  </div>
              </div>
          </div>
          <div className="row">
              <div className="col-lg-7">
                  <form action="/" className="mb-4 mb-lg-0">
                      <div className="form-row">
                          <div className="col-md-6 form-group">
                              <input type="text" name="name" className="form-control" id="nameMail" placeholder="Your Name" 
                                value={nameMail}
                                onChange= {(e) => setNameMail(e.target.value)} 
                              />
                          </div>
                          <div className="col-md-6 form-group">
                              <input type="email" className="form-control" name="email" id="emailMail" placeholder="Your Email" 
                                value={emailMail}
                                onChange= {(e) => setEmailMail(e.target.value)} 
                              />
                          </div>
                      </div>
                      <div className="form-group">
                          <input type="text" className="form-control" name="subject" id="subjectMail" placeholder="Subject" 
                            value={subjectMail}
                            onChange= {(e) => setSubjectMail(e.target.value)} 
                          />
                      </div>
                      <div className="form-group">
                          <textarea className="form-control" name="message" id="messageMail" placeholder="Type Message"
                            value={messageMail}
                            onChange= {(e) => setMessageMail(e.target.value)} 
                          >
                          </textarea>
                      </div>
                      <button type="submit" className="btn btn-light" >Contact Now</button>
                  </form>
              </div>

              <div className="col-lg-5">
                  <div className="map">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7449.281863410991!2d105.8394545058765!3d21.007025790639073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac76ccab6dd7%3A0x55e92a5b07a97d03!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBCw6FjaCBraG9hIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1650900710255!5m2!1svi!2s" width={"100%"} height={450} style={{border:"0"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                  </div>
              </div>
          </div>
      </div>
      <div className="App-header profile-card text-center shadow bg-light p-4 my-5 rounded-3" id="aboutUs">
        <div className="profile-photo shadow">
            <img src={avatar} alt="profile Photo" className="img-fluid"/>
        </div>
        <h3 className="pt-3 text-secondary">Tran Cong Hoang</h3>
        <p className="text-secondary">Web Developer & Designer</p>
        <div className="social-links">
            <ul>
                <li><a href="#" style={{color:"#ccc"}}><i className="fa fa-facebook"></i></a></li>
                <li><a href="#" style={{color:"#ccc"}}><i className="fa fa-twitter"></i></a></li>
                <li><a href="#" style={{color:"#ccc"}}><i className="fa fa-instagram"></i></a></li>
                <li><a href="#" style={{color:"#ccc"}}><i className="fa fa-linkedin"></i></a></li>                            
            </ul>
        </div>
      </div>
    </section>
  )
}