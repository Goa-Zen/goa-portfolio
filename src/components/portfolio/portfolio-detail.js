import React  from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  useParams } from 'react-router-dom';
import PortfolioDetailItem from "./portfolio-detail item";

const PortfolioDetail = () => {
    const params = useParams( );
    // console.log("params", params);

    return (
    <div className="portfolio-detail-wrapper">
      <div>
        <Link to="/" > <FontAwesomeIcon icon="left-long" /> </Link>
      </div>
        <PortfolioDetailItem id={params.slug} />
      </div>
    );

}

export default PortfolioDetail;