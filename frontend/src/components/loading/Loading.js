import React from "react";
import Spinner from "../../assets/spinner.gif";
import "./Loading.scss";

const Loading = (props) => {
  const { visible } = props;

  return visible ? (
    <div className="loading__container">
      <img src={Spinner} alt="Wait a sencod" />
    </div>
  ) : null;
};

export default Loading;
