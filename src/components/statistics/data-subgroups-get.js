import React from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  useParams } from 'react-router-dom';
import DataSubgroupsGetAll from "./data-subgroups-get-all";

const DataSubgroupsGet = () => {
    const params = useParams( );
    // console.log("params", params);

    return (
    <div className="subgroups-main-main-wrapper">
      {/* <div>
        <Link to="/" > <FontAwesomeIcon icon="left-long" /> </Link>
      </div> */}
        <DataSubgroupsGetAll id={params.slug} />
      </div>
    );

}

export default DataSubgroupsGet;