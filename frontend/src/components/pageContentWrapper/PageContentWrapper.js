import React from "react";
import "./PageContentWrapper.scss";

const PageContentWrapper = (props) => {
  const { children, breadcrumb } = props;
  return (
    <div className="page-content__container">
      {breadcrumb}
      <div className="page-content__items">{children}</div>
    </div>
  );
};

export default PageContentWrapper;
