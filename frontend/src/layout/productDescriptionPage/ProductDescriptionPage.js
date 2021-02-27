import React, { useState, useEffect } from "react";
import { getItemById } from "../../api/api";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import PageContentWrapper from "../../components/pageContentWrapper/PageContentWrapper";
import PdpItemWrapper from "../../components/pdpItemWrapper/PdpItemWrapper";
import Loading from "../../components/loading/Loading";
import "./ProductDescriptionPage.scss";

const ProductDescriptionPage = ({ match }) => {
  const [itemRequested, setItemRequested] = useState(null);
  const id = match.params.id;

  useEffect(() => {
    let execute = true;
    if (execute) {
      getItem(id);
    }
    return () => (execute = false);
  }, [id, itemRequested]);

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
    } else {
      return <Loading visible={true} />;
    }
  };

  return <PageContentWrapper>{validateItem()}</PageContentWrapper>;

  async function getItem(id) {
    await getItemById(id)
      .then((res) => {
        setItemRequested(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
export default ProductDescriptionPage;
