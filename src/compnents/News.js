import React, { Component } from "react";
import Newsitems from "./Newsitems";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 6, 
    category: 'general',
  }

  static propTypes = {
   country: PropTypes.string,
   pageSize: PropTypes.number,
   category:PropTypes.string,
  }

  capitalizeFirstLetter = (string)=>{
    return string[0].toUpperCase() + string.slice(1);
  }
    constructor(props){
        super(props);
        this.state ={
            articles: [],
            loading: false,
            page:1
        }
        document.title = `Newsify - ${this.capitalizeFirstLetter(this.props.category)}`;
    }
     async UpdateNews(){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d282d6ad0ee44bbb8aabe2d9cde33a58&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
       let parsedData = await data.json()
       this.setState({articles: parsedData.articles, totalResults:parsedData.totalResults,
        loading:false
      })
     }
    async componentDidMount() {
      //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d282d6ad0ee44bbb8aabe2d9cde33a58&page=1&pageSize=${this.props.pageSize}`;
      //   this.setState({loading:true});
      //   let data = await fetch(url);
      //   let parsedData = await data.json()
      //   this.setState({articles: parsedData.articles, totalResults:parsedData.totalResults,
      //   loading:false
      // })
      this.UpdateNews();
    }
    handlePreviousClick=async()=>{
      // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d282d6ad0ee44bbb8aabe2d9cde33a58&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      // this.setState({loading:true});
      // let data = await fetch(url);
      // let parsedData = await data.json()
      // this.setState({articles: parsedData.articles,
      //   loading:false
      // })
      this.setState({page: this.state.page - 1,});
      this.UpdateNews();
    }

    handleNextClick=async()=>{
    //   if ((this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))) {
    //   }else{
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d282d6ad0ee44bbb8aabe2d9cde33a58&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //   this.setState({loading:true});
    //   let data = await fetch(url);
    //   let parsedData = await data.json()
    //  this.setState({
    //   page: this.state.page + 1,
    //   articles: parsedData.articles,
    //   loading:false
    //   } )
    // }
    this.setState({page: this.state.page + 1,});
    this.UpdateNews();
    }
  render(){
     return (
        <div className="container my-3">
          <h1 style={{ textAlign: "center" }}>Newsify - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
          <br />
         {this.state.loading && <Spinner/>}
          <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{
                return  <div className="col-md-4" key={element.url}>
                <Newsitems title={element.title?element.title:""} discription={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
              </div>
            })}
          </div>
          <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous </button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
          </div>
        </div>
    )
  }
}
export default News;
