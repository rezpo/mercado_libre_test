import React from "react";
import NumberFormat from "react-number-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import "./ResultItemWrapper.scss";

const ResultItemWrapper = (props) => {
  const { id, price, title, picture, free_shipping, history, address } = props;

  return (
    <li
      className="resultitem__item"
      onClick={() => history.push(`items/${id}`)}
    >
      <div className="item-info">
        <div className="item-pic">
          <img src={picture} alt={title} />
        </div>
        <div className="item-detail">
          <div className="item-price__container">
            <NumberFormat
              value={price}
              displayType={"text"}
              thousandSeparator={"."}
              decimalSeparator={","}
              prefix={"$"}
              className="item-price"
            />
            {free_shipping && (
              <div className="item-new">
                <FontAwesomeIcon icon={faTruck} size={"sm"} />
              </div>
            )}
          </div>
          <p className="item-title">{title}</p>
        </div>
      </div>
      <div className="item-shipping">
        <span>{address}</span>
      </div>
    </li>
  );
};

export default ResultItemWrapper;
