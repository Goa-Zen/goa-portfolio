import React, { Component } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

// import PortfolioContainer from "./portfolio/portfolio-container";

import NavigationContainer from "./navigation/navigation-container";

import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import BlogDetail from "./pages/blog-detail";
import PortfolioDetail from "./portfolio/portfolio-detail";
import PortfolioManager from "./pages/portfolio-manager";
import Auth from "./pages/auth";
import NoMatch from "./pages/no-match";
import Icons from "../helpers/icons";
import Statistics from './pages/statistics';
import DataSubgrupsGetAll from './statistics/data-subgroups-get-all';
import DataIndicatorsGetAll from './statistics/data-indicators-get-all';

import "../style/main.scss";


export default class App extends Component {
  constructor(props) {
    super(props);

    Icons();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    });
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }
  
  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  checkLoginStatus() {
    return axios
      .get("https://api.devcamp.space/logged_in", {
        withCredentials: true
      })
      .then(response => {
        const loggedIn = response.data.logged_in;
        const loggedInStatus = this.state.loggedInStatus;

        // If loggedIn and status LOGGED_IN => return data
        // If loggedIn status NOT_LOGGED_IN => update state
        // If not loggedIn and status LOGGED_IN => update state

        if (loggedIn && loggedInStatus === "LOGGED_IN") {
          return loggedIn;
        } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedInStatus: "LOGGED_IN"
          });
        } else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN"
          });
        }
      })
      .catch(error => {
        console.log("Error", error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  authorizedPages() {
    return [
      <Route path="/portfolio-manager" element ={<PortfolioManager />} />

    ]
  }
  render() {
    // this.getPortfolioItems();
    return (
      <div className='container'>
        <Router>
          <NavigationContainer 
            loggedInStatus = { this.state.loggedInStatus } 
            handleSuccessfulLogout= {this.handleSuccessfulLogout} 

            />
          <Routes>
            <Route key="base" exact path="/" element ={<Home />} />
            <Route 
              key="auth"
              path="/auth" 
              render={props => (
                  <Auth
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                  />
                )}
              />
            <Route key="about-me" path="/about-me" element ={<About />} />
            <Route key="contact" path="/contact" element ={<Contact />} />
            <Route 
              key="statistics" 
              path="/statistics" 
              element ={<Statistics />} 

              />
              <Route
                path="/statistics/subgroups/:slug"
                element ={<DataSubgrupsGetAll />} 
                // render={props => (
                //   <DataSubgrupsGetAll
                //     {...props}
                    
                //   />
                // )}
              />    
              <Route
                path="/statistics/indicators/:slug"
                element ={<DataIndicatorsGetAll />} 
                // render={props => (
                //   <DataIndicatorsGetAll
                //     {...props}
                    
                //   />
                // )}
              />                  
            <Route
                key="blog"
                path="/blog"
                // element ={<Blog />} 
                render={props => (
                  <Blog 
                  {...props} 
                  loggedInStatus={this.state.loggedInStatus}
                   />
                )}
              />
              <Route
                path="/b/:slug"
                render={props => (
                  <BlogDetail
                    {...props}
                    loggedInStatus={this.state.loggedInStatus}
                  />
                )}
              />
            {/* <Route path="/portfolio-manager" element ={PortfolioManager} /> */}
            { this.state.loggedInStatus === "LOGGED_IN" ? this.authorizedPages() : null}
            {/* <Route path="/portfolio-manager" element ={PortfolioManager} />  */}
            <Route
                exact="/portfolio/:slug"
                key="portfolio-slug"
                path="/portfolio/:slug"
                element ={<PortfolioDetail />}
              />
          
            {/* Must be at the end */}
            <Route  key="nomatch" element ={<NoMatch />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
