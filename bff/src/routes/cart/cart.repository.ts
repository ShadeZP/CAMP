import axios from 'axios';
import https from 'https';
import { AddProductToCartPayload } from '../../models/Cart.model';
import { MagentoProductInCart, MagentoUpdateProductsInCartPayload, MagentoCart } from '../../models/Magento-cart';
import { covertAddToCartPayload } from './utils/convert-cart';

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});


export const createGuestCart = async (): Promise<string> => {
  try {
    const response = await instance.post('https://magento.test/rest/default/V1/guest-carts');
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getCartById = async (cartId: string): Promise<MagentoCart> => {
  try {
    const response = await instance.get(`https://magento.test/rest/default/V1/guest-carts/${cartId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getCartItems = async (cartId: string): Promise<MagentoProductInCart[]> => {
  try {
    const response = await instance.get(`https://magento.test/rest/default/V1/guest-carts/${cartId}/items`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const addProductToCart = async (body: MagentoUpdateProductsInCartPayload, cartId: string): Promise<MagentoProductInCart> => {
  try {
    const response = await instance.post(`https://magento.test/rest/default/V1/guest-carts/${cartId}/items`, body);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateProductQuantity = async (body: MagentoUpdateProductsInCartPayload, cartId: string): Promise<MagentoProductInCart> => {
  try {
    const response = await instance.put(`https://magento.test/rest/default/V1/guest-carts/${cartId}/items/${body.cartItem.item_id}`, body);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const removeProductFromCart = async (item_id: number, cartId: string): Promise<boolean> => {
  try {
    const response = await instance.delete(`https://magento.test/rest/default/V1/guest-carts/${cartId}/items/${item_id}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
