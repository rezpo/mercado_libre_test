const express = require("express");
const axios = require("axios");

const app = express();

// CHECK IF PRICE AMOUNT IS INTEGER
checkInt = (number) => {
  return number % 1 === 0;
};

// ALLOW CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// REQUEST FOR PRODUCT BY ID
app.get("/api/items/:id", async (req, res) => {
  const itemID = req.params.id;

  // AXIOS REQUEST ENDPOINTS
  const getItem = `https://api.mercadolibre.com/items/${itemID}`;
  const getItemDetail = `https://api.mercadolibre.com/items/${itemID}/description`;

  // AXIOS REQUEST
  try {
    const [item, itemDescription] = await axios.all([
      axios.get(getItem),
      axios.get(getItemDetail),
    ]);

    const {
      id,
      title,
      currency_id,
      price,
      pictures,
      condition,
      shipping,
      sold_quantity,
    } = item.data;

    // RESPONSE JSON
    const itemData = {
      author: { name: "Daniel", lastname: "Rebolledo" },
      item: {
        id,
        title,
        price: {
          currency: currency_id,
          amount: checkInt(price) ? price : Math.floor(price),
          decimals: checkInt(price)
            ? 0
            : parseInt((price % 1).toFixed(2).split(".")[1]),
        },
        picture: pictures[0].secure_url,
        condition,
        free_shipping: shipping.free_shipping,
        sold_quantity,
        description: itemDescription.data.plain_text,
      },
    };
    res.json(itemData);
  } catch (error) {
    console.log(error.response.data);
  }
});

// REQUEST FOR PRODUCT BY QUERY
app.get("/api/items", async (req, res) => {
  // GET QUERY
  const queryReq = "q:" + req.query.q;

  // AXIOS REQUEST ENDPOINT
  const getItemsByQuery = "https://api.mercadolibre.com/sites/MLA/search";

  // AXIOS REQUEST
  try {
    const getQueryResult = await axios.get(getItemsByQuery, {
      params: { q: queryReq, limit: 4 },
    });

    // INITIAL STATE OF RESPONSE JSON
    const itemsFound = [];
    const categoriesFound = [];

    const { results, available_filters, site_id } = getQueryResult.data;

    // VALIDATE RESPONSE
    if (results.length && available_filters.length) {
      const filterCategories = available_filters.filter(
        (categorie) => categorie.id === "category"
      );
      const getCategories = filterCategories[0].values.map((category) => ({
        name: category.name,
        results: category.results,
      }));

      categoriesFound.push(...getCategories);

      results.forEach((item) => {
        itemsFound.push({
          id: item.id,
          title: item.title,
          price: {
            currency: item.currency_id,
            amount: checkInt(item.price) ? item.price : Math.floor(item.price),
            decimals: checkInt(item.price)
              ? 0
              : parseInt((item.price % 1).toFixed(2).split(".")[1]),
          },
          picture: item.thumbnail,
          condition: item.condition,
          free_shipping: item.shipping.free_shipping,
          state_address: item.address.state_name,
        });
      });
    } else if (!results.length || !available_filters.length) {
      itemsFound.push({ site_id, no_matches: true, query: req.query.q });
      categoriesFound.push("NO_MATCHES");
    }

    // BUILD RESPONSE JSON
    const itemsData = {
      author: {
        name: "Daniel",
        lastname: "Rebolledo",
      },
      categories: categoriesFound,
      items: [...itemsFound],
    };

    res.json(itemsData);
  } catch (error) {
    console.log(error.response.data);
  }
});

app.listen(5000);
