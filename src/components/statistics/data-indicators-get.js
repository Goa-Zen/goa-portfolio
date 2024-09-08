import React from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  useParams } from 'react-router-dom';
import DataIndicatorsGetAll from "./data-indicators-get-all";

const DataIndicatorsGet = () => {
    const params = useParams( );
    // console.log("params", params);

    return (
    <div className="indicators-main-main-wrapper">
      {/* <div>
        <Link to="/" > <FontAwesomeIcon icon="left-long" /> </Link>
      </div> */}
        <DataIndicatorsGetAll id={params.slug} />
      </div>
    );

}

export default DataIndicatorsGet;