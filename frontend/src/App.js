import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageNotFound from "./pages/404/PageNotFound";
import MainWrapper from "./layout/mainWrapper/MainWrapper";
import ProductDescriptionPage from "./layout/productDescriptionPage/ProductDescriptionPage";
import DisplaySearchResults from "./layout/displaySearchResult/DisplaySearchResult";
import SEOHelmet from "./components/seoHelmet/SEOHelmet";
import "./App.scss";

function App() {
  return (
    <Router>
      <SEOHelmet
        title="Buscador de productos de Mercado Libre"
        description="Todo lo que necesitas en un solo lugar, somos la comunidad de compra y venta mas grande de América Latina"
      />
      <Switch>
        <MainWrapper>
          {/* Main route */}
          <Route path="/" exact />
          {/* Product page (PDP) route */}
          <Route path="/items/:id" exact component={ProductDescriptionPage} />
          {/* Products found by query */}
          <Route path={"/items"} exact component={DisplaySearchResults} />
        </MainWrapper>
        {/* Page not found */}
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
