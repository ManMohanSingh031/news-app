import React, { useEffect, useState } from "react";
import NewsItem from "./Newsitems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    try {
      let data = await fetch(url);
      props.setProgress(30);
      let parsedData = await data.json();
      props.setProgress(70);
      
      if (Array.isArray(parsedData.articles)) {
        setArticles((prevArticles) => [...prevArticles, ...parsedData.articles]);
      } else {
        console.error("Invalid articles data:", parsedData.articles);
      }
      
      setTotalResults(parsedData.totalResults);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
    setLoading(false);
    props.setProgress(100);
  };
  

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, props.country, props.category, props.apiKey, props.pageSize]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
     <h1 className="text-center" style={{margin:"35px 0px", marginTop:"80px"}}>
  NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
</h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
        <div className="row">
  {articles.map((element, index) => (
    <div className="col-md-4" key={`${element.url}-${index}`}>
      <NewsItem
        title={element.title || ""}
        description={element.description || ""}
        imageUrl={element.urlToImage}
        newsUrl={element.url}
        author={element.author}
        date={element.publishedAt}
      />
    </div>
  ))}
</div>

        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;
