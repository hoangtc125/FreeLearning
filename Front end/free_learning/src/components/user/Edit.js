import { useEffect, useState } from "react"
import * as API from '../../constants/api_config'


export function Edit() {

  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [role, setRole] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [status, setStatus] = useState("")

  useEffect(() => {
    fetch(API.DOMAIN + API.PROFILE, {
      method: 'POST', // or 'PUT'
      headers: {
        'accept': 'application/json',
        'Authorization': window.localStorage.getItem("FREE_LEARNING_TOKEN"),
      },
      credentials: "same-origin",
      // mode: 'no-cors'
    })
    .then(response => {
      return response.json()})
    .then(data => {
      if(data?.detail) {
        alert(data.detail)
      } else {
        setName(data.data.fullname)
        setPhoneNumber(data.data.phone)
        setEmail(data.data.email)
        setRole(data.data.role)
        setBio(data.data.profile)
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, [])

  function handleUpdateProfile() {
    fetch(API.DOMAIN + API.UPDATE_PROFILE, {
      method: 'PUT', // or 'PUT'
      headers: {
        'accept': 'application/json',
        'Authorization': window.localStorage.getItem("FREE_LEARNING_TOKEN"),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: "", email: email, fullname: name, phone: phoneNumber, profile: bio }),
      credentials: "same-origin",
      // mode: 'no-cors'
    })
    .then(response => {
      return response.json()})
    .then(data => {
      if(data?.detail) {
        alert(data.detail)
      } else {
        alert("Successful !!!")
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  function handleUpdatePassword() {
    if (newPassword !== repeatPassword) {
      setStatus("Miss matching !!!")
    } else {
      setStatus("")
      fetch(API.DOMAIN + API.UPDATE_PASSWORD, {
        method: 'PUT', // or 'PUT'
        headers: {
          'accept': 'application/json',
          'Authorization': window.localStorage.getItem("FREE_LEARNING_TOKEN"),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ old_password: oldPassword, new_password: newPassword}),
        credentials: "same-origin",
        // mode: 'no-cors'
      })
      .then(response => {
        return response.json()})
      .then(data => {
        if(data?.detail) {
          alert(data.detail)
        } else {
          alert("Successful !!!")
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
          <div className="col-md-3 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5"><i class="fa fa-user-plus fa-5x" aria-hidden="true"></i><span className="font-weight-bold">{name}</span><span className="text-black-50">{email}</span><span> </span></div>
          </div>
          <div className="col-md-5 border-right">
              <div className="p-3 py-5">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="text-right">Profile Settings</h4>
                  </div>
                  <div className="row mt-3">
                      <div className="col-md-12"><label className="labels">Full name</label>
                        <input type="text" className="form-control" placeholder=""
                          value={name}
                          onChange= {(e) => setName(e.target.value)} 
                        />
                      </div>
                      <div className="col-md-12"><label className="labels">PhoneNumber</label>
                        <input type="text" className="form-control" placeholder=""
                          value={phoneNumber}
                          onChange= {(e) => setPhoneNumber(e.target.value)} 
                        />
                      </div>
                      <div className="col-md-12"><label className="labels">Email</label>
                        <input type="text" className="form-control" placeholder=""
                          value={email}
                          onChange= {(e) => setEmail(e.target.value)} 
                        />
                      </div>
                      <div className="col-md-12"><label className="labels">Role</label>
                        <input type="text" className="form-control" placeholder=""
                          value={role}
                          onChange= {(e) => setRole(e.target.value)} 
                        />
                      </div>
                      <div className="col-md-12"><label className="labels">Bio</label>
                        <input type="text" className="form-control" placeholder=""
                          value={bio}
                          onChange= {(e) => setBio(e.target.value)} 
                        />
                      </div>
                  </div>
                  <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button"
                    onClick={() => {
                      handleUpdateProfile()
                    }}
                  >Save Profile</button></div>
              </div>
          </div>
          <div className="col-md-4">
              <div className="p-3 py-5">
                  <div className="d-flex justify-content-between align-items-center experience"><span>Edit Password</span></div>
                  <div className="col-md-12"><label className="labels">Old Password</label>
                    <input type="password" className="form-control" placeholder=""
                      value={oldPassword}
                      onChange= {(e) => setOldPassword(e.target.value)} 
                    />
                  </div> <br/>
                  <div className="col-md-12"><label className="labels">New Password</label>
                    <input type="password" className="form-control" placeholder=""
                      value={newPassword}
                      onChange= {(e) => setNewPassword(e.target.value)} 
                    />
                  </div> <br/>
                  <div className="col-md-12"><label className="labels">Repeat Password</label>
                    <input type="password" className="form-control" placeholder=""
                      value={repeatPassword}
                          onChange= {(e) => setRepeatPassword(e.target.value)} 
                    />
                  </div>
                  <div style={{color:"red"}}>{status}</div>
                  <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button"
                    onClick={() => {
                      handleUpdatePassword()
                    }}
                  >Save Password</button></div>
              </div>
          </div>
      </div>
  </div>
  )
}