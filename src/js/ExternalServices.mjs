const baseUrl = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor() {
    // this.category = category;
    // this.path = `/json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(`${baseUrl}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  
  async findProductById(id) {
    const response = await fetch(`${baseUrl}product/${id}`);
    const data = await convertToJson(response);
    console.log(data.result);
    return data.Result;
  }

  async checkout(orderData) {
    const url = "https://wdd330-backend.onrender.com/checkout";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    };

    const response = await fetch(url, options);
    return response.json();
  }

}
