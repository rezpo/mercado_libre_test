import React from "react";
import SearchBar from "../../components/searchbar/SearchBar";
import { useHistory } from "react-router-dom";
import "./MainWrapper.scss";

const MainWrapper = (props) => {
  const { children } = props;
  const history = useHistory();
  return (
    <div className="mainwrapper">
      <SearchBar history={history} />
      {children}
    </div>
  );
};

export default MainWrapper;
