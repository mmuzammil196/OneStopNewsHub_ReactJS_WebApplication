import React from "react";

const NewsItem = (props)=> {
  
    let { title, description, imageUrl, newsUrl, author, date, source } =
      props;
    return (
      <div>
        <div className="card">
          <div style={{display : 'flex', justifyContent: 'flex-end', position: 'absolute', right : '0'}}>
        <span className="badge rounded-pill bg-danger" >
                {source}
                
              </span>
              </div>
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://www.aljazeera.com/wp-content/uploads/2023/05/2023-05-02T203712Z_1160629535_RC2KQ0AZLHWU_RTRMADP_3_ISRAEL-PALESTINIANS-PRISONER-1683059979.jpg"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}...
              
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "UnKnown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItem;
