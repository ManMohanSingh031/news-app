import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Newsitems extends Component {
  render() {
    let { title, discription,imageUrl, newsUrl, author, date} = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img src={!imageUrl?"https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1fd0LG.img?w=749&h=421&m=6":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}<h6><span class="badge bg-secondary">News</span></h6></h5>
            <p className="card-text"> {discription} </p>
            <div className="card-footer"><small className="text-body-secondary">By: {!author? 'Unknown': author} on {new Date (date).toGMTString()}</small></div>
            <Link  rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</Link>
          </div>
        </div>
      </div>
    ); 
  }
}

export default Newsitems;
