import { useEffect, useState } from "react"
import { Loader } from "../Loader"
import * as API from '../../constants/api_config'


function Follower(data) {

  const [info, setInfo] = useState(data.data)

  return (
    <div className="col-lg-12 col-xl-6" style={{padding:"10px", minHeight:"120px"}}>
        <div className="card">
            <div className="card-block post-timelines" style={{minHeight:"100px"}}>
                <div className="media bg-white d-flex">
                    <div className="media-left media-middle">
                        <a href="#" onClick={() => {
                          window.localStorage.setItem("FREE_LEARNING_ID_FOUND", info.id)
                          window.location.href = API.FIND_ONE + info.id
                        }}>
                            <img className="media-object" width="120" src={info.avatar} alt=""/>
                        </a>
                    </div>
                    <div className="media-body friend-elipsis">
                        <div className="f-15 f-bold m-b-5">{info.fullname}</div>
                        <div className="text-muted social-designation">{info.role}</div>
                        <div className="text-muted social-designation">{info.phone}</div>
                        <div className="text-muted social-designation">{info.email}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export function Followers(data) {

  const [load, setLoad] = useState(false)
  const [username, setUsername] = useState(data.username)
  const [users, setUsers] = useState([])

  useEffect(() => {
    setLoad(true)
    fetch(API.DOMAIN + API.GET_FOLLOWERS + username, {
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
        setUsers(data.data.followers)
        setLoad(false)
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, [data])

  return (
    <div className="row">
      {load && <Loader/>}
      {users &&
        users.map((user, id) => {
          return <Follower key={id} data={{"id":user.id, "fullname":user.fullname, "role":user.role, "phone":user.phone, "email":user.email, "avatar":user.avatar}}/>
        })
      }
    </div>
  )
}