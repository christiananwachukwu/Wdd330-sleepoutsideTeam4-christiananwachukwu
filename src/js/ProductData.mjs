const baseURL = "https://wdd330-backend.onrender.com/";
console.log('🔍 Base URL:', baseURL);
 
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}
 
export default class ProductData {
  async getData(category) {
    const fullURL = `${baseURL}products/search/${category}`;
    console.log('🌐 Full URL being fetched:', fullURL);
    
    const response = await fetch(fullURL);
    console.log('📥 Response:', response);
    console.log('📥 Response status:', response.status);
    
    const data = await convertToJson(response);
    return data.Result;
  }
 
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
}
 