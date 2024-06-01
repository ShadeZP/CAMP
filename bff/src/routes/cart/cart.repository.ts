import axios from 'axios';
import https from 'https';
import {
  MagentoProductInCart,
  MagentoUpdateProductsInCartPayload,
  MagentoCart,
  MagentoAddressInformationResponse,
  MagentoAddressInformationPayload, MagentoCreateOrderPayload, Country,
} from '../../models/Magento-cart';

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
};

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

export const addShippingAddress = async (cartId: string, payload: MagentoAddressInformationPayload): Promise<MagentoAddressInformationResponse> => {
  try {
    const response = await instance.post(`https://magento.test/rest/default/V1/guest-carts/${cartId}/shipping-information`, payload);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};


export const createOrder = async (cartId: string, payload: MagentoCreateOrderPayload): Promise<number> => {
  try {
    const response = await instance.put(`https://magento.test/rest/default/V1/guest-carts/${cartId}/order`, payload);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getCountryById = async (countryId: string): Promise<Country> => {
  try {
    const response = await instance.get(`https://magento.test/rest/default/V1/directory/countries/${countryId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
