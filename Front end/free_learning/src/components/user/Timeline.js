import { useEffect } from 'react';
import logo from '../../logo.svg';


export function Timeline({avatar, name, timeline, ...props}) {
  const [date, time] = new Date(timeline?.created_at * 1000 + 25200000).toLocaleString().split(',')
  return (
    <li>
      {/* <!-- begin timeline-time --> */}
      <div className="timeline-time">
          <span className="date">{date}</span>
          <span className="time">{time}</span>
      </div>
      {/* <!-- end timeline-time --> */}
      {/* <!-- begin timeline-icon --> */}
      <div className="timeline-icon">
          <a href="">&nbsp;</a>
      </div>
      {/* <!-- end timeline-icon --> */}
      {/* <!-- begin timeline-body --> */}
      <div className="timeline-body" style={{width:"60vw"}}>
          <div className="timeline-header">
            <span className="userimage">
              <img src={avatar} style={{height:"fit-content", width:"fit-content", marginTop:"6px"}} alt=""/>
            </span>
            <span className="username"><a href="">{name} </a> <small></small></span>
            <span className="pull-right text-muted">0 Views</span>
          </div>
          <div className="timeline-content">
            <p>
                {timeline?.content} 
            </p>
          </div>
          <div className="timeline-likes">
            <div className="stats-right">
                <span className="stats-text">0 Shares</span>
                <span className="stats-text">0 Comments</span>
            </div>
            <div className="stats">
                <span className="fa-stack fa-fw stats-icon">
                <i className="fa fa-circle fa-stack-2x text-danger"></i>
                <i className="fa fa-heart fa-stack-1x fa-inverse t-plus-1"></i>
                </span>
                <span className="fa-stack fa-fw stats-icon">
                <i className="fa fa-circle fa-stack-2x text-primary"></i>
                <i className="fa fa-thumbs-up fa-stack-1x fa-inverse"></i>
                </span>
                <span className="stats-total">0</span>
            </div>
          </div>
          <div className="timeline-footer" style={{display:"flex", justifyContent:"space-between"}}>
            <a 
            onClick={e => e.preventDefault()}
            href="" className="m-r-15 text-inverse-lighter"><i className="fa fa-thumbs-up fa-fw fa-lg m-r-3"></i> Like</a>
            <a 
            onClick={e => e.preventDefault()}
            href="" className="m-r-15 text-inverse-lighter"><i className="fa fa-comments fa-fw fa-lg m-r-3"></i> Comment</a> 
            <a 
            onClick={e => e.preventDefault()}
            href="" className="m-r-15 text-inverse-lighter"><i className="fa fa-share fa-fw fa-lg m-r-3"></i> Share</a>
          </div>
          <div className="timeline-comment-box" style={{background:"transparent"}}>
            <div className="user"><img src={window.localStorage.getItem("FREE_LEARNING_AVATAR")} style={{height:"fit-content", width:"fit-content", marginTop:"6px"}} alt=""/></div>
            <div className="input">
                <form action="">
                  <div className="input-group">
                      <input type="text" className="form-control rounded-corner" placeholder="Bình luận "/>
                      <span className="input-group-btn p-l-10">
                      <button className="btn btn-primary f-s-12 rounded-corner" type="button">Đăng </button>
                      </span>
                  </div>
                </form>
            </div>
          </div>
      </div>
      {/* <!-- end timeline-body --> */}
    </li>
  )
}