

export function Followers() {
  return (
    <div className="col-lg-12 col-xl-6" style={{padding:"10px"}}>
        <div className="card">
            <div className="card-block post-timelines">
                <div className="media bg-white d-flex">
                    <div className="media-left media-middle">
                        <a href="#">
                            <img className="media-object" width="120" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""/>
                        </a>
                    </div>
                    <div className="media-body friend-elipsis">
                        <div className="f-15 f-bold m-b-5">Josephin Doe</div>
                        <div className="text-muted social-designation">Software Engineer</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}