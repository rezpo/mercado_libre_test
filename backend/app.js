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
  const itemEndPoint = `https://api.mercadolibre.com/items/${itemID}`;
  const itemDescriptionEndPoint = `https://api.mercadolibre.com/items/${itemID}/description`;

  // AXIOS REQUEST
  let itemData;
  let itemDescriptionData;

  await axios.get(itemEndPoint).then(async (response) => {
    if (response.status === 200) {
      await axios
        .get(itemDescriptionEndPoint)
        .then((response) => {
          itemDescriptionData = response.data;
        })
        .catch((error) => {
          if (error.response.data.status === 404) {
            itemDescriptionData = "NO_DESCRIPTION";
          } else {
            console.log(error.response.data);
          }
        });
    }

    const {
      id,
      title,
      currency_id,
      price,
      pictures,
      condition,
      shipping,
      sold_quantity,
    } = response.data;

    itemData = {
      author: { name: "Daniel", lastname: "Rebolledo" },
      item: {
        id,
        title,
        price: {
          currency: currency_id,
          amount: checkInt(price) ? price : Math.floor(price),
          decimals: checkInt(price)
            ? "00"
            : parseInt((price % 1).toFixed(2).split(".")[1]),
        },
        picture: pictures[0].secure_url,
        condition,
        free_shipping: shipping.free_shipping,
        sold_quantity,
        description:
          itemDescriptionData === "NO_DESCRIPTION"
            ? "Producto sin descripción"
            : itemDescriptionData.plain_text,
      },
    };

    res.json(itemData);
  });
});

// REQUEST FOR PRODUCT BY QUERY
app.get("/api/items", async (req, res) => {
  // GET QUERY
  const queryReq = "q:" + req.query.q;

  // AXIOS REQUEST ENDPOINT
  const getItemsByQuery = "https://api.mercadolibre.com/sites/MLA/search";

  const itemsFound = [];
  const categoriesFound = [];

  // AXIOS REQUEST
  await axios
    .get(getItemsByQuery, {
      params: { q: queryReq, limit: 4 },
    })
    .then((response) => {
      // INITIAL STATE OF RESPONSE JSON

      const { results, available_filters, site_id } = response.data;

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
              amount: checkInt(item.price)
                ? item.price
                : Math.floor(item.price),
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
    })
    .catch((error) => {
      console.log(error);
      res.json({
        no_matches: true,
        query: req.query.q,
        message: "No hay productos que concuerden con tu busqueda",
      });
    });
});

app.listen(5000);
