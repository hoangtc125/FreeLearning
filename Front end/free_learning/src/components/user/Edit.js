import { useState } from "react"


export function Edit() {

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
  const [email, setEmail] = useState("")
  const [education, setEducation] = useState("")
  const [country, setCountry] = useState("")
  const [region, setRegion] = useState("")
  const [experience, setExperience] = useState("")
  const [detail, setDetail] = useState("")

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
          <div className="col-md-3 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" src="https://scontent.fhan3-3.fna.fbcdn.net/v/t39.30808-1/257731232_1313909815716888_3818428840467093702_n.jpg?stp=dst-jpg_p240x240&_nc_cat=108&ccb=1-5&_nc_sid=7206a8&_nc_ohc=VFCVu-fNIH8AX8-OxtC&_nc_ht=scontent.fhan3-3.fna&oh=00_AT9OlEzkd8wMErO0EAwqlMSwUXANCKr7Iafx21XQGQh3ZA&oe=626D165C"/><span className="font-weight-bold">Tran Cong Hoang</span><span className="text-black-50">amelly12@bbb.com</span><span> </span></div>
          </div>
          <div className="col-md-5 border-right">
              <div className="p-3 py-5">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="text-right">Profile Settings</h4>
                  </div>
                  <div className="row mt-2">
                      <div className="col-md-6"><label className="labels">Name</label>
                        <input type="text" className="form-control" placeholder="first name"
                          value={name}
                          onChange= {(e) => setName(e.target.value)} 
                        />
                      </div>
                      <div className="col-md-6"><label className="labels">Surname</label>
                        <input type="text" className="form-control" placeholder="surname"
                          value={surname}
                          onChange= {(e) => setSurname(e.target.value)} 
                        />
                      </div>
                  </div>
                  <div className="row mt-3">
                      <div className="col-md-12"><label className="labels">PhoneNumber</label>
                        <input type="text" className="form-control" placeholder="enter phone number"
                          value={phoneNumber}
                          onChange= {(e) => setPhoneNumber(e.target.value)} 
                        />
                      </div>
                      <div className="col-md-12"><label className="labels">Address</label>
                        <input type="text" className="form-control" placeholder="enter address"
                          value={address}
                          onChange= {(e) => setAddress(e.target.value)} 
                        />
                      </div>
                      <div className="col-md-12"><label className="labels">Email</label>
                        <input type="text" className="form-control" placeholder="enter email id"
                          value={email}
                          onChange= {(e) => setEmail(e.target.value)} 
                        />
                      </div>
                      <div className="col-md-12"><label className="labels">Education</label>
                        <input type="text" className="form-control" placeholder="education"
                          value={education}
                          onChange= {(e) => setEducation(e.target.value)} 
                        />
                      </div>
                  </div>
                  <div className="row mt-3">
                      <div className="col-md-6"><label className="labels">Country</label>
                        <input type="text" className="form-control" placeholder="country"
                          value={country}
                          onChange= {(e) => setCountry(e.target.value)} 
                        />
                      </div>
                      <div className="col-md-6"><label className="labels">State/Region</label>
                        <input type="text" className="form-control" placeholder="state"
                          value={region}
                          onChange= {(e) => setRegion(e.target.value)} 
                        />
                      </div>
                  </div>
                  <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button">Save Profile</button></div>
              </div>
          </div>
          <div className="col-md-4">
              <div className="p-3 py-5">
                  <div className="d-flex justify-content-between align-items-center experience"><span>Edit Experience</span><span className="border px-3 p-1 add-experience"><i className="fa fa-plus"></i>&nbsp;Experience</span></div><br/>
                  <div className="col-md-12"><label className="labels">Experience in Designing</label>
                    <input type="text" className="form-control" placeholder="experience"
                      value={experience}
                      onChange= {(e) => setExperience(e.target.value)} 
                    />
                  </div> <br/>
                  <div className="col-md-12"><label className="labels">Additional Details</label>
                    <input type="text" className="form-control" placeholder="additional details"
                      value={detail}
                          onChange= {(e) => setDetail(e.target.value)} 
                    />
                  </div>
              </div>
          </div>
      </div>
  </div>
  )
}