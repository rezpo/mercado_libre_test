import React, { useState, useEffect } from "react";
import { queryResult } from "../../api/api";
import { sortBy } from "lodash";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import ResultItemWrapper from "../../components/resultItemWrapper/ResultItemWrapper";
import PageContentWrapper from "../../components/pageContentWrapper/PageContentWrapper";
import ErrorMessageWrapper from "../../components/errorMessageWrapper/ErrorMessageWrapper";
import SEOHelmet from "../../components/seoHelmet/SEOHelmet";
import "./DisplaySearchResult.scss";

const DisplaySearchResult = ({ history, location }) => {
  const [results, setResults] = useState(null);
  const [showError, setShowError] = useState(false);
  const [queryItemId, setQueryItemId] = useState(false);
  const params = new URLSearchParams(location.search);
  const query = params.get("search");

  useEffect(() => {
    let execute = true;
    if (execute) {
      getMatchByQuery(query);
    }
    return () => (execute = false);
  }, [query]);

  useEffect(() => {
    let execute = true;
    if (execute) {
      if (queryItemId && !results) {
        history.push(`items/${query}`);
      }
    }
    return () => (execute = false);
  }, [results, queryItemId]);

  const renderBreadCrumb = () => {
    return (
      <div className="displayresults__breadcrumbs-container">
        <ul className="displayresults__breadcrumb">
          {results.categories.map((category) => {
            return <BreadCrumb name={category.name} key={category.name} />;
          })}
        </ul>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="pdp--error-message">
        <h1>¡WOW! Esto es vergonsozo</h1>
        <p>
          Al parecer no encontramos ningún producto que concuerde con tu
          busqueda.
        </p>
        <div className="go-home">
          <button
            onClick={() => setShowError(false)}
            className="btn-primary--regular"
          >
            Realizar nueva busqueda
          </button>
        </div>
      </div>
    );
  };

  return results ? (
    <PageContentWrapper
      breadcrumb={renderBreadCrumb()}
      key={results.categories}
    >
      <SEOHelmet
        title={
          results
            ? "Busca y encuentra miles de productos de la comunidad mas grande de compra venta en América Latina"
            : "Al parecer no hay nada aquí"
        }
        description={
          results
            ? `Hemos encontrado ${results.items.length} productos para tu busqueda - ${query}`
            : "Al parecer no hemos encontrado nada"
        }
      />
      <ul className="displayresults__items">
        {results.items.map((item) => {
          return (
            <ResultItemWrapper
              id={item.id}
              key={item.id}
              price={item.price.amount}
              title={item.title}
              picture={item.picture}
              condition={item.condition}
              free_shipping={item.free_shipping}
              address={item.state_address}
              history={history}
            />
          );
        })}
      </ul>
    </PageContentWrapper>
  ) : (
    <ErrorMessageWrapper children={errorMessage()} visible={showError} />
  );

  function getMatchByQuery(query) {
    queryResult(query)
      .then((res) => {
        if (res.no_matches && res.message) {
          setResults(null);
          setShowError(true);
        } else if (
          res.items[0].no_matches &&
          query.includes(res.items[0].site_id)
        ) {
          setResults(null);
          setQueryItemId(true);
        } else {
          const resArr = sortBy(res.categories, "results");
          setResults({ ...res, categories: resArr });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export default DisplaySearchResult;
