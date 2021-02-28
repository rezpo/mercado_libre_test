import React from "react";
import NumberFormat from "react-number-format";
import "./PdpItemWrapper.scss";

const PdpItemWrapper = (props) => {
  const {
    picture,
    title,
    description,
    condition,
    sold_quantity,
    amount,
    decimals,
  } = props;

  return (
    <div className="pdp-item__container">
      <div className="pdp-item__detail">
        <div className="pdp-item-pic">
          <img src={picture} alt={title} />
        </div>
        <div className="pdp-item-description">
          <h3>Descripción del producto</h3>
          <p>{description}</p>
        </div>
      </div>
      <div className="pdp-item__price">
        <small className="pdp-item-condition">
          {condition === "new" ? "Nuevo" : "Usado"} - {sold_quantity} vendidos
        </small>
        <h1 className="pdp-item-name">{title}</h1>
        <span className="pdp-item-price">
          <NumberFormat
            value={amount}
            prefix={"$"}
            displayType={"text"}
            thousandSeparator={"."}
            decimalSeparator={","}
          />
          <small>{decimals}</small>
        </span>
        <button className="btn-primary--regular">Comprar</button>
      </div>
    </div>
  );
};

export default PdpItemWrapper;
