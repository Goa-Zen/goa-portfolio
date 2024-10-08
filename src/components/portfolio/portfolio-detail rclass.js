import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import PropTypes from 'prop-types'; // ES6
import { withRouter } from "../navigation/with-router";

class PortfolioDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
        currentId: this.props.match.params.slug,
        portfolioItem: {}
      };

  }

  componentWillMount() {
    this.getPortfolioItem();
  }

  getPortfolioItem() {
    axios
      .get(
        `https://jordan.devcamp.space/portfolio/portfolio_items/${
          this.props.match.params.slug
        }`,
        { withCredentials: true }
      )
      .then(response => {
        console.log("res", response);
        this.setState({
            portfolioItem: response.data.portfolio_item
          });
      })
      .catch(error => {
        console.log("getportfolioitem error", error);
      });
  }

  render() {
    const {
        banner_image_url,
        category,
        description,
        logo_url,
        name,
        thumb_image_url,
        url
      } = this.state.portfolioItem;
      
     
      const bannerStyles = {
        backgroundImage: "url(" + banner_image_url + ")",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center"
      };
  
      const logoStyles = {
        width: "200px"
      };
    return (
    <div className="portfolio-detail-wrapper">
      <div>
        <Link to="/" > <FontAwesomeIcon icon="left-long" /> </Link>
      </div>
        
        <div className="banner" style={bannerStyles}>
          <img src={logo_url} style={logoStyles} />
        </div>

        <div className="portfolio-detail-description-wrapper">
          <div className="description">{description}</div>
        </div>

        <div className="bottom-content-wrapper">
          <a href={url} className="site-link" target="_blank">
            Visit {name}
          </a>
        </div>
      </div>
    );
  }
}

export default PortfolioDetail;