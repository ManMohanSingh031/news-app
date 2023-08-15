import React, { Component } from "react";

export class Newsitems extends Component {
  render() {
    let { title, discription,imageUrl, newsUrl} = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img src={!imageUrl?"https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1fd0LG.img?w=749&h=421&m=6":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text"> {discription} </p>
            <a  rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
          </div>
        </div>
      </div>
    ); 
  }
}

export default Newsitems;
