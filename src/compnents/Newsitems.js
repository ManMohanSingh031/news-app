import React from "react";
import { Link } from "react-router-dom";

const Newsitems = (props) => {
  const {
    title, description, imageUrl, newsUrl,author,date} = props;

  return (
      <div className="card">
        <img
          src={!imageUrl ? "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1fd0LG.img?w=749&h=421&m=6" : imageUrl}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">
            {title} <span className="badge bg-secondary">New</span>
          </h5>
          <p className="card-text">{description}</p>
          <div className="card-footer">
            <small className="text-body-secondary">
              By: {!author ? "Unknown" : author} on{" "}
              {date ? new Date(date).toGMTString() : "Unknown Date"}
            </small>
          </div>
          <Link
            rel="noreferrer"
            to={newsUrl}
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Read more
          </Link>
        </div>
      </div>
  )};

export default Newsitems;

