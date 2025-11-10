// ProductData.mjs
function convertToJson(res) {
  if (res.ok) return res.json();
  throw new Error("Bad Response");
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${category}.json`; // path to JSON file
  }

  getData() {
    return fetch(this.path).then(convertToJson);
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}
