import axios from "axios";

async function getItemById(itemId) {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/items/${itemId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function queryResult(query) {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/items/?q=${query}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export { getItemById, queryResult };
