
export default class ProductData {
  constructor(file) {
    this.file = file;
    this.path = `/json/${this.file}`; // points to public/json/
  }

  async getData() {
    try {
      const response = await fetch(this.path);
      if (!response.ok) throw new Error(`Failed to fetch ${this.path}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error loading data:", error);
      return [];
    }
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}
