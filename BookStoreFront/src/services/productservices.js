import { axios_obj } from "../http-common.js";

class ProductService {
  searchProduct(title) {
    return axios_obj.get(`products/title/${title}`);
  }
}

export default new ProductService();
