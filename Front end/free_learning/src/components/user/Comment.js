import * as API from '../../constants/api_config'
import { useEffect, useState } from "react"


function Cmt(data) {

  const [info, setInfo] = useState(data.data)
  const [date, setDate] = useState("")

  useEffect(() => {
    setDate(new Date(info.created_at * 1000).toLocaleString())
  }, [])

  return (
    <div className="be-comment">
      <div className="be-img-comment">	
        <a href="#" onClick={(e) => {
          e.preventDefault()
          window.localStorage.setItem("FREE_LEARNING_ID_FOUND", info.user_id)
          window.location.href = API.FIND_ONE + info.user_id
        }}>
          <img src={info.avatar} alt="" className="be-ava-comment"/>
        </a>
      </div>
      <div className="be-comment-content">
        
          <span className="be-comment-name">
            <a href="#" onClick={(e) => {
              e.preventDefault()
              window.localStorage.setItem("FREE_LEARNING_ID_FOUND", info.user_id)
              window.location.href = API.FIND_ONE + info.user_id
            }}>
            {window.localStorage.getItem("FREE_LEARNING_USERNAME") === data.data.username &&
              "You"
            }
            {window.localStorage.getItem("FREE_LEARNING_USERNAME") !== data.data.username &&
              info.name
            }
            </a>
            </span>
          <span className="be-comment-time">
            <i className="fa fa-clock-o"></i>
            {date}
          </span>

        <p className="be-comment-text">
          {info.content}
        </p>
      </div>
    </div>
  )
}

export function Comment(data) {

  const [comments, setComments] = useState([])
  const [value, setValue] = useState("")
  
  useEffect(() => {
    fetch(API.DOMAIN + API.GET_COMMENTS + data.id, {
      method: 'POST', // or 'PUT'
      headers: {
        'accept': 'application/json',
      },
      credentials: "same-origin",
      // mode: 'no-cors'
    })
    .then(response => {
      return response.json()})
    .then(dt => {
      if(dt?.detail) {
        alert(dt.detail)
      } else {
        if (dt) {
          setComments(dt.data || []) 
        }
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, [])

  function handleCreateComment() {
    if (value.length === 0) {
      alert("Bình luận không được để trống ")
      return
    }
    let comment = {
      "created_at": Number(new Date()),
      "content": value,
      "at_blog": data.id,
      "at_username": window.localStorage.getItem("FREE_LEARNING_USERNAME"),
      "user_id": window.localStorage.getItem("FREE_LEARNING_USERID"),
      "avatar": window.localStorage.getItem("FREE_LEARNING_AVATAR"),
      "fullname": "You"
    }
    setComments(comments => [...comments, comment])
    setValue("")
    fetch(API.DOMAIN + API.CREATE_COMMENT, {
      method: 'POST', // or 'PUT'
      headers: {
        'accept': 'application/json',
        'Authorization': window.localStorage.getItem("FREE_LEARNING_TOKEN"),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
      credentials: "same-origin",
      // mode: 'no-cors'
    })
    .then(response => {
      return response.json()})
    .then(dt => {
      if(dt?.detail) {
        alert(dt.detail)
      } else {
        
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <div className="container">
      <div className="be-comment-block" style={{padding:"20px 0px 0px"}}>
        <h1 className="comments-title">Bình luận ({comments.length})</h1>
        {comments.length > 0 &&
          comments.map((comment, id) => {
            return <Cmt key={id} data={{"created_at": comment.created_at, "content": comment.content, "idBlog": comment.at_blog, "name": comment.fullname, "user_id": comment.user_id, "avatar": comment.avatar, "username": comment.at_username}}/>
          })
        }
        <div className="form-block">
          <div className="row">
            <div className="col-xs-12">									
              <div className="form-group">
                <textarea className="form-input" placeholder="Your text" value={value} 
                  onChange={(e) => setValue(e.target.value)}
                  style={{color:"#333"}}
                ></textarea>
              </div>
              {window.localStorage.getItem("FREE_LEARNING_TOKEN") &&
                <button className="btn btn-primary pull-right" style={{width:"fit-content"}}
                  onClick={() => handleCreateComment()}
                >Gửi bình luận </button>
              }
              {!window.localStorage.getItem("FREE_LEARNING_TOKEN") &&
                <span className="sr-only">Hãy đăng nhập để đăng bình luận này lên Free Learning ... 
                  <button className="btn btn-primary pull-right" style={{width:"fit-content"}} disabled>Gửi bình luận </button>
                </span>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}