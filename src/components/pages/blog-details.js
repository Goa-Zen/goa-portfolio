import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  useParams } from 'react-router-dom';
import BlogDetail from "./blog-detail";

const BlogDetails = (props) => {
    const params = useParams( );
    // console.log("params", params);

    return (
    <div className="blog-detail-wrapper">
      <div>
        <Link to="/blog/" > <FontAwesomeIcon icon="left-long" /> </Link>
      </div>
        <BlogDetail id={params.slug} loggedInStatus={props.loggedInStatus} />
      </div>
    );

}

export default BlogDetails;