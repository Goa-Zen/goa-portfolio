// import logo from '../logo.svg';
import React, { Component } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import axios from "axios";

// import PortfolioContainer from "./portfolio/portfolio-container";

import NavigationContainer from "./navigation/navigation-container";

import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import BlogDetails from "./pages/blog-details";
import PortfolioDetail from "./portfolio/portfolio-detail";
import PortfolioManager from "./pages/portfolio-manager";
import Auth from "./pages/auth";
import NoMatch from "./pages/no-match";
import Icons from "../helpers/icons";
import Statistics from './pages/statistics';
import DataSubgroupsGet from './statistics/data-subgroups-get';
import DataIndicatorsGet from './statistics/data-indicators-get';

import "../style/main.scss";

export default class App extends Component {
  constructor(props) {
    super(props);

    Icons();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    };
    // console.log("propertis ", this.state.properties);
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
      <Route path="/portfolio-manager" Component={PortfolioManager} />

    ]
  }
  render() {
    // this.getPortfolioItems();
    return (
      <div className='container'>

        <Router>
          <NavigationContainer key="mainmenu"
            loggedInStatus = { this.state.loggedInStatus } 
            handleSuccessfulLogout= {this.handleSuccessfulLogout} 
            />
          <Routes>
            <Route key="base" exact path="/" Component={Home} />
            <Route 
              key="auth"
              path="/auth" 
              element={<Auth  
                handleSuccessfulLogin={this.handleSuccessfulLogin}
                handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
              />}
              />
            <Route key="about-me" path="/about-me" Component={About} />
            <Route key="contact" path="/contact" Component={Contact} />
            <Route 
              exact
              key="statistics" 
              path="/statistics" 
              Component={Statistics} 
              />

            <Route
              path="/statistics/subgroups/:slug"
              element = {<DataSubgroupsGet />}
            />    
            <Route
              path="/statistics/indicators/:slug"
              element = {<DataIndicatorsGet />}
            />                  
            {/* <Route key="blog" path="/blog" Component={Blog} /> */}
            <Route
                key="blog"
                path="/blog"
                element={<Blog  loggedInStatus={this.state.loggedInStatus} />}
              />
              <Route
                path="/b/:slug"
                element={<BlogDetails loggedInStatus={this.state.loggedInStatus} />}
              />

             { this.state.loggedInStatus === "LOGGED_IN" ? this.authorizedPages() : null}
            
            <Route
                exact
                key="portfolio-slug"
                path="/portfolio/:slug"
                Component={PortfolioDetail}
              />
          
            {/* Must be at the end */}
            <Route  key="nomatch" Component={NoMatch} />
          </Routes>
        </Router>
        

        {/* <PortfolioContainer /> */}

      </div>
    );
  }
}
