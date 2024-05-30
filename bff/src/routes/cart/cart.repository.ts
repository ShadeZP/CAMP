import axios from 'axios';
import https from 'https';
import { UpdateProductInCartPayload } from '../../models/Cart.model';
import { MagentoAddProductInCart, MagentoAddProductToCartPayload, MagentoCart } from '../../models/Magento-cart';
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

export const getCarById = async (cartId: string): Promise<MagentoCart> => {
  try {
    const response = await instance.get(`https://magento.test/rest/default/V1/guest-carts/${cartId}`);
    console.log(response.data)
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getCartItems = async (cartId: string) => {
  try {
    const response = await instance.get(`https://magento.test/rest/default/V1/guest-carts/${cartId}/items`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const addProductToCart = async (body: MagentoAddProductToCartPayload, cartId: string): Promise<MagentoCart> => {
  try {
    const response = await instance.post(`https://magento.test/rest/default/V1/guest-carts/${cartId}/items`, body);
    return response.data;
  } catch (err) {
    // console.error(err);
    throw err;
  }
};
