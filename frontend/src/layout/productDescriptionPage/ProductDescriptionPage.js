import React, { useState, useEffect } from "react";
import { getItemById } from "../../api/api";
import PageContentWrapper from "../../components/pageContentWrapper/PageContentWrapper";
import PdpItemWrapper from "../../components/pdpItemWrapper/PdpItemWrapper";
import Loading from "../../components/loading/Loading";
import SEOHelmet from "../../components/seoHelmet/SEOHelmet";
import ErrorMessageWrapper from "../../components/errorMessageWrapper/ErrorMessageWrapper";
import "./ProductDescriptionPage.scss";

const ProductDescriptionPage = ({ match, history }) => {
  const [itemRequested, setItemRequested] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showError, setShowError] = useState(false);
  const id = match.params.id;

  useEffect(() => {
    let execute = true;
    if (execute) {
      getItem(id);
    }
    return () => (execute = false);
  }, []);

  const validateItem = () => {
    if (itemRequested) {
      const {
        picture,
        title,
        description,
        condition,
        sold_quantity,
        price,
      } = itemRequested.item;
      return (
        <PdpItemWrapper
          picture={picture}
          title={title}
          description={description}
          condition={condition}
          sold_quantity={sold_quantity}
          amount={price.amount}
          decimals={price.decimals}
        />
      );
    }
  };

  const errorMessage = () => {
    return (
      <div className="pdp--error-message">
        <h1>UPS!...</h1>
        <p>
          Al parecer hubo algún problema y no tenemos información del producto
          que buscas, prueba con otra busqueda
        </p>
        <div className="go-home">
          <button
            onClick={() => history.push("/")}
            className="btn-primary--regular"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  };
  return (
    <PageContentWrapper>
      <SEOHelmet
        title={
          itemRequested
            ? itemRequested.item.title
            : "Al parecer no hay nada aquí"
        }
        description={
          itemRequested
            ? itemRequested.item.description
            : "Al parecer no hay descripción"
        }
      />
      {validateItem()}
      <Loading visible={isVisible} />
      <ErrorMessageWrapper children={errorMessage()} visible={showError} />
    </PageContentWrapper>
  );

  async function getItem(id) {
    setIsVisible(true);

    await getItemById(id)
      .then((res) => {
        setIsVisible(false);
        setItemRequested(res);
      })
      .catch((error) => {
        console.log(error);
        setIsVisible(false);
        setShowError(true);
      });
  }
};
export default ProductDescriptionPage;
