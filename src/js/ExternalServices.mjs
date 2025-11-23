const baseUrl = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  // convert response to JSON safely
  const jsonResponse = await res.json().catch(() => null); // if invalid JSON, return null
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse || { error: "Unknown server error" } };
  }
}

export default class ExternalServices {
  constructor() {}

  // fetch list of products by category
  async getData(category) {
    try {
      const response = await fetch(`${baseUrl}/products/search/${encodeURIComponent(category)}`);
      const data = await convertToJson(response);
      console.log("Products fetched for category", category, ":", data);
      return data?.Result || []; // always return an array
    } catch (err) {
      console.error("Error fetching products:", err);
      return []; // return empty array on error
    }
  }

  // fetch single product by id
  async findProductById(id) {
    try {
      const response = await fetch(`${baseUrl}/product/${id}`);
      const data = await convertToJson(response);
      return data?.Result || null;
    } catch (err) {
      console.error("Error fetching product by id:", err);
      return null;
    }
  }

  // checkout function
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    try {
      const response = await fetch(`${baseUrl}/checkout`, options);
      const data = await convertToJson(response);
      return data;
    } catch (err) {
      console.error("Checkout error:", err);
      throw err;
    }
  }
}