import React from 'react'

function Banner(props) {
    let first,second = null;
    if(props.pos==1){
        first = (<div className="col-lg-6">
        <div>
            <img src={props.illusImage} className="img-fluid" height="500" width="500"></img>
        </div>
        </div>)
        second = (<div className="col-lg-6">
        <div className="mb-5 mb-lg-0 text-center text-lg-start">
            <h1 className="display-2 lh-1 mb-3">{props.titleLine}</h1>
            <p className="lead fw-normal text-muted mb-5">{props.subtitleLine}</p>
        </div>
    </div>)
    }
    else{
        second = (<div className="col-lg-6">
        <div>
            <img src={props.illusImage} className="img-fluid" height="500" width="500"></img>
        </div>
        </div>)
        first = (<div className="col-lg-6">
        <div className="mb-5 mb-lg-0 text-center text-lg-start">
            <h1 className="display-2 lh-1 mb-3">{props.titleLine}</h1>
            <p className="lead fw-normal text-muted mb-5">{props.subtitleLine}</p>
        </div>
    </div>)
    }
    
    return(
        <div className="container px-5">
                <div className="row gx-6 align-items-center" style={{ height: "500px" }}>
                    {first}
                    {second}
                </div>
            </div>
    )
}


export default Banner