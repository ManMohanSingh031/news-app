import React, { Component } from "react";
import Navbar from "./compnents/Navbar";
import News from "./compnents/News";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API
  
  state={
    progress: 0
  }
  setProgress = (Progress)=>{
    this.setState({progress: Progress})
  }
  render() {
    return (
      <div>
        <Router>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
      />
        <Navbar/>

          <Routes>
            <Route exact path="/general" element={<News setProgress={this.setProgress} apiKey = {this.apiKey} key="general" pageSize={6} country="in" category="general"/>}></Route>
            <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey = {this.apiKey} key="sports" pageSize={6} country="in" category="sports" />}></Route>
            <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey = {this.apiKey} key="business" pageSize={6} country="in" category="business"/>}></Route>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey = {this.apiKey} key="entertainment" pageSize={6} country="in" category="entertainment"/> }></Route>
            <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey = {this.apiKey} key="health" pageSize={6} country="in" category="health"/>} ></Route>
            <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey = {this.apiKey} key="science" pageSize={6} country="in" category="science"/>}></Route>
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey = {this.apiKey} key="technology" pageSize={6} country="in" category="technology"/>}></Route>
          </Routes>
        </Router>
      </div>
    );
  }
}
