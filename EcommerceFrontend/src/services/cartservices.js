import { axios_obj } from "../http-common.js";

class CartService {
  getCartItems(userId) {
    return axios_obj.get(`/cart/${userId}`);
  }

  addToCart(data) {
    return axios_obj.post("/user/addProduct", data);
  }
}

export default new CartService();
