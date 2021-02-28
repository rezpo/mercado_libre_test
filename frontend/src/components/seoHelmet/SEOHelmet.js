import React from "react";
import { Helmet } from "react-helmet";
import Favicon from "../../assets/favicon.ico";
const SEOHelmet = (props) => {
  const { title, description } = props;
  return (
    <Helmet>
      <meta charset="utf8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="shortcut icon" href={Favicon} />
    </Helmet>
  );
};

export default SEOHelmet;
