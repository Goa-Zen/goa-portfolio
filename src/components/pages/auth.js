import React from "react";
import Login from "../auth/login";
// import loginImg from "../../static/assets/images/auth/login.jpg";
import BackgroundImage from "../images/background-image-rc";
import {  useNavigate } from 'react-router-dom';

const Auth = (props) => {
  // constructor(props) {

  //   super(props);

  //   this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  //   this.handleUnsuccessfulAuth = this.handleUnsuccessfulAuth.bind(this);
  //   // const navigate = useNavigate();
  //   // const params = useParams( );
  //   // console.log("params", params);
  // }

  const navigate = useNavigate();
  
  const handleSuccessfulAuth = () => {
    
    // props.history.push("/");
    navigate("/");
    props.handleSuccessfulLogin();
  } 

  const handleUnsuccessfulAuth  = () =>  {
    props.handleUnsuccessfulLogin();

  }

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
            handleSuccessfulAuth={handleSuccessfulAuth}
            handleUnsuccessfulAuth={handleUnsuccessfulAuth}
            />
        </div>
      </div>
    );
 
}

export default Auth;