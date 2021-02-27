import React from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/logo-ml.png";
import "./SearchBar.scss";

const SearchBar = (props) => {
  const { history } = props;
  const { register, handleSubmit } = useForm();

  const onSubmitForm = (data) => {
    history.push(`/items?search=${data.searchBar}`);
  };

  const resetInput = (e) => {
    e.target.value = "";
  };

  return (
    <div className="searchbar">
      <div className="searchbar__content">
        <div className="searchbar__logo" onClick={() => history.push("/")}>
          <img src={Logo} alt="Mercado Libre Latino América" className="logo" />
        </div>
        <form className="searchbar__form" onSubmit={handleSubmit(onSubmitForm)}>
          <input
            className="searchbar-input"
            type="text"
            placeholder="Buscar productos, marcas y mas..."
            name="searchBar"
            ref={register}
            onFocus={(e) => resetInput(e)}
          />
          <button type="submit" className="search-btn">
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
