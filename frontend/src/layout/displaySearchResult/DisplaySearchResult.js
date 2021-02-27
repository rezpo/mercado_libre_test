import React, { useState, useEffect } from "react";
import { queryResult } from "../../api/api";
import { sortBy } from "lodash";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import ResultItemWrapper from "../../components/resultItemWrapper/ResultItemWrapper";
import PageContentWrapper from "../../components/pageContentWrapper/PageContentWrapper";
import "./DisplaySearchResult.scss";

const DisplaySearchResult = ({ history, location }) => {
  const [results, setResults] = useState(null);
  const [queryItemId, setQueryItemId] = useState(false);
  const params = new URLSearchParams(location.search);
  const query = params.get("search");

  useEffect(() => {
    let execute = true;
    if (execute) {
      getMatchByQuery(query);
      if (queryItemId && !results) {
        history.push(`items/${query}`);
      }
    }
    return () => (execute = false);
  }, [results, history, query, queryItemId]);

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

  return results ? (
    <PageContentWrapper
      breadcrumb={renderBreadCrumb()}
      key={results.categories}
    >
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
  ) : null;

  async function getMatchByQuery(query) {
    await queryResult(query)
      .then((res) => {
        if (res.items[0].no_matches && query.includes(res.items[0].site_id)) {
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
