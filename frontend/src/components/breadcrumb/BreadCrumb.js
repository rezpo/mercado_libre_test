import React from "react";
import "./BreadCrumb.scss";

const BreadCrumb = (props) => {
  const { name } = props;

  return <li className="breadcrumb">{name}</li>;
};

export default BreadCrumb;
