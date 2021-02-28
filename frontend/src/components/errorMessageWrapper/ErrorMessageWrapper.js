import React from "react";
import "./ErrorMessageWrapper.scss";

const ErrorMessageWrapper = (props) => {
  const { children, visible } = props;

  return visible ? (
    <div className="error-message__container">
      <div className="error-message__content">{children}</div>
    </div>
  ) : null;
};

export default ErrorMessageWrapper;
