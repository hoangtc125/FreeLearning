import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../logo.svg';
import * as API from '../constants/api_config'

export function LoginForm() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleLogin() {
    fetch(API.DOMAIN + API.LOGIN, {
      method: 'POST', // or 'PUT'
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`,
      credentials: "same-origin",
      // mode: 'no-cors'
    })
    .then(response => {
      return response.json()})
    .then(data => {
      if(data?.detail) {
        alert(data.detail)
      } else {
        const TOKEN = data.token_type + " " + data.access_token
        window.localStorage.setItem('FREE_LEARNING_TOKEN', TOKEN);
        window.localStorage.setItem('FREE_LEARNING_USERNAME', username);
        window.localStorage.setItem('FREE_LEARNING_AVATAR', data.avatar);
        window.location.reload();
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <div className="modal fade" id="ModalLoginForm" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          
            <div>
              <div className="modal-header">
                <h5 className="modal-title">Modal Log in Form</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                    <label htmlFor="Username">Username<span className="text-danger">*</span></label>
                    <input type="text" name="username" className="form-control" id="Username" placeholder="Enter Username"
                      value={username}
                      onChange= {(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="Password">Password<span className="text-danger">*</span></label>
                    <input type="password" name="password" className="form-control" id="Password" placeholder="Enter Password"
                      value={password}
                      onChange= {(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input className="form-check-input" type="checkbox" value="" id="remember" required/>
                    <label className="form-check-label" htmlFor="remember">Remember Me</label>
                    <a href="#" className="float-end" data-bs-target="#ModalForgotPasswordForm" data-bs-toggle="modal" data-bs-dismiss="modal">Forgot Password</a>
                </div>
              </div>
              <div className="modal-footer pt-4">                  
                <button 
                  type="button" className="btn btn-success mx-auto w-100" 
                  onClick={() => handleLogin()}
                >
                  Log in
                </button>
              </div>
              <p className="text-center">Not yet account, <a href="#" data-bs-target="#ModalSignUpForm" data-bs-toggle="modal" data-bs-dismiss="modal">Sign up</a></p> 
          </div>
        </div>
      </div>
    </div>
  )
}

export function ForgotPasswordForm() {

  const [email, setEmail] = useState("")

  function handleForgotPassword() {
    fetch(API.DOMAIN + API.FORGOT_PASSWORD + `${email}`, {
      method: 'POST', // or 'PUT'
      headers: {
        'accept': 'application/json',
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
        alert(data.data)
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <div className="modal fade" id="ModalForgotPasswordForm" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          
            <div>
              <div className="modal-header">
                <h5 className="modal-title">Modal Forgot Password Form</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                    <label htmlFor="Username">Email<span className="text-danger">*</span></label>
                    <input type="text" name="email" className="form-control" id="Email" placeholder="Enter Email"
                      value={email}
                      onChange= {(e) => setEmail(e.target.value)}
                    />
                </div>
              </div>
              <div className="modal-footer pt-4">                  
                <button 
                  type="button" className="btn btn-success mx-auto w-100" 
                  onClick={() => handleForgotPassword()}
                >
                  Send new password to email
                </button>
              </div>
              <p className="text-center">Already have an account? <a href="#" data-bs-target="#ModalLoginForm" data-bs-toggle="modal" data-bs-dismiss="modal">Log in</a></p>
              <p className="text-center">Not yet account, <a href="#" data-bs-target="#ModalSignUpForm" data-bs-toggle="modal" data-bs-dismiss="modal">Sign up</a></p> 
          </div>
        </div>
      </div>
    </div>
  )
}

export function SignUpForm() {

  const [username, setUsername] = useState("")
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [status, setStatus] = useState("")

  function handleRegister() {
    if(password != repeatPassword) {
      setStatus("Password misses matching")
    } else {
      setStatus("")
      fetch(API.DOMAIN + API.REGISTER, {
        method: 'POST', // or 'PUT'
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, email: email, fullname: fullname, password: password }),
        credentials: "same-origin",
        // mode: 'no-cors'
      })
      .then(response => {
        return response.json()})
      .then(data => {
        if(data?.detail) {
          alert(data.detail)
        } else {
          alert("Successful !!! Please login to use our service")
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }

  return (
    <div className="modal fade" id="ModalSignUpForm" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div >
            <form className="">
              <div className="modal-header">
                <h5 className="modal-title">Modal Sign up Form</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                    <label htmlFor="name">Username<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" placeholder="Username" name="username" required
                      value={username}
                      onChange= {(e) => setUsername(e.target.value)}  
                    />
                </div> 
                <div className="mb-3">
                    <label htmlFor="name">Full Name<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" placeholder="Full Name" name="name" required
                      value={fullname}
                      onChange= {(e) => setFullname(e.target.value)}  
                    />
                </div> 
                <div className="mb-3">
                    <label htmlFor="email">Email<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" placeholder="Enter Email" name="email" required
                      value={email}
                      onChange= {(e) => setEmail(e.target.value)}  
                    />
                </div>      
                <div className="mb-3">
                    <label htmlFor="psw">Password<span className="text-danger">*</span></label>
                    <input type="password" className="form-control" placeholder="Enter Password" name="psw" required
                      value={password}
                      onChange= {(e) => setPassword(e.target.value)}  
                    /> 
                  </div>   
                  <div className="mb-3">
                    <label htmlFor="psw-repeat">Repeat Password<span className="text-danger">*</span></label>
                    <input type="password" className="form-control" placeholder="Repeat Password" name="psw-repeat" required
                      value={repeatPassword}
                      onChange= {(e) => {setRepeatPassword(e.target.value)}}  
                    />
                  </div>
                <div>
                  <label className="form-check-label" style={{color:"red"}}>{status}</label>
                </div>
                <div className="mb-3">
                  <label className="term-policy"><input type="checkbox" required/> By creating an account you agree to our <a href="#">Terms & Privacy</a>.</label>
                </div>
                  <button type="submit" className="btn btn-success mx-auto w-100" onClick={(e) => {
                    e.preventDefault()  
                    handleRegister()}
                  }>Sign up</button>
                  <input className="form-check-input" type="checkbox" value="" id="remember2"/>
                  <label className="form-check-label" htmlFor="remember">Remember Me</label>
                <hr/>
                <div className="mb-3">
                  <p className="text-center">Already have an account? <a href="#" data-bs-target="#ModalLoginForm" data-bs-toggle="modal" data-bs-dismiss="modal">Log in</a></p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export function LoginSignup() {
  return (
    <div className="d-flex">
      <button className="btn btn-warning" type="submit" style={{"marginRight":"5px"}} data-bs-toggle="modal" data-bs-target="#ModalLoginForm">Log in</button>
      <button className="btn btn-danger" type="submit" data-bs-toggle="modal" data-bs-target="#ModalSignUpForm">Sign up</button>
    </div>
  )
}

export function UserInNavbar() {

  const [account, setAccount] = useState(window.localStorage.getItem("FREE_LEARNING_USERNAME"))
  const [avatar, setAvatar] = useState(window.localStorage.getItem("FREE_LEARNING_AVATAR"))

  function handleLogout() {
    window.localStorage.removeItem("FREE_LEARNING_TOKEN")
    window.localStorage.removeItem("FREE_LEARNING_USERNAME")
    window.localStorage.removeItem('FREE_LEARNING_AVATAR');
    window.location.reload()
  }

  return (
    <ul className="navbar-nav">
      <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {avatar === "" &&
                <i className="fa fa-user" aria-hidden="true" style={{width:"50px"}}></i>
              }
              {avatar !== "" &&
                <img className="" src={avatar} style={{maxHeight:"50px", maxWidth:"50px", marginRight:"10px"}}/>
              }
            <a className="navbar-brand" href="#">{account}</a>
          </a>
          <ul className="dropdown-menu listRight" aria-labelledby="navbarDropdown">
            <Link className="dropdown-item" to="/user/profile">Profile</Link>
            <Link className="dropdown-item" to="/user/edit">Edit Profile</Link>
            <button className="dropdown-item" onClick={() => handleLogout()}>Log Out</button>
          </ul>
      </li>
    </ul>
  )
}

export function NavBar() {

  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const username = window.localStorage.getItem("FREE_LEARNING_USERNAME")
    if (username) {
      setIsLogin(username)
    } else {
      setIsLogin(false)
    }
  }, [])

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <ForgotPasswordForm/>
      <LoginForm/>
      <SignUpForm/>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/root">
          <h2 className="text-warning">Free Learning
            <img src={logo} className="App-logo-mini" alt="logo" width={50}/>
          </h2>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mob-navbar" aria-label="Toggle">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mob-navbar">
            <ul className="navbar-nav mb-2 mb-lg-0 mx-auto">
              <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link active" to="/search">Search</Link>
              </li>
              <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle active" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Our Services</a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><Link className="dropdown-item" to="/course">Course</Link></li>
                      <li><Link className="dropdown-item" to="/blog">Blog</Link></li>
                      <li><Link className="dropdown-item" to="/markdown">Write Markdown</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" to="#">Explore More</Link></li>
                  </ul>
              </li>
              <li className="nav-item active">
                  <Link className="nav-link active" to="/contactUs">Contact Us</Link>
              </li>
          </ul>
          {isLogin === false && 
            <LoginSignup/>
          }
          {isLogin && 
            <UserInNavbar/>
          }
        </div>
      </div>
    </nav>
  )
}