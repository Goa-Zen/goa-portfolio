import React, { Component } from "react";
import Login from "../auth/login";
// import loginImg from "../../static/assets/images/auth/login.jpg";
import BackgroundImage from "../images/background-image-rc";
// import {  useNavigate } from 'react-router-dom';

export default class Auth extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleUnsuccessfulAuth = this.handleUnsuccessfulAuth.bind(this);
    // const navigate = useNavigate();
    // const params = useParams( );
    // console.log("params", params);
  }

  
  handleSuccessfulAuth() {
    
    // this.props.history.push("/");
    // navigate("/");
    this.props.handleSuccessfulLogin();
  }
  handleUnsuccessfulAuth() {
    this.props.handleUnsuccessfulLogin();

  }
  render() {
    return (
      <div className="auth-page-wrapper">
        <BackgroundImage 
          collection="auth" 
          imgIndex="0" 
          className="left-column"
          allowClick="false"
          />

      {/* </div> */}

        <div className="right-column">
            <Login
            handleSuccessfulAuth={this.handleSuccessfulAuth}
            handleUnsuccessfulAuth={this.handleUnsuccessfulAuth}
            />
        </div>
      </div>
    );
  }
}