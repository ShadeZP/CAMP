import {
  CustomCart,
  AddProductToCartPayload,
  UpdateQuantityPayload,
  RemoveProductFromCartPayload, SetShippingAddressPayload,
} from '../../models/Cart.model';
import {
  MagentoUpdateProductsInCartPayload,
  CustomProductInCart,
  MagentoAddressInformationResponse, MagentoAddressInformationPayload, MagentoCreateOrderPayload,
} from '../../models/Magento-cart';
import { getProduct } from '../product/product.repository';
import {
  addProductToCart as addProductToCartRepo,
  createGuestCart as createGuestCartRepo,
  getCartById as getCartByIdRepo,
  updateProductQuantity as updateProductQuantityRepo,
  removeProductFromCart as removeProductFromCartRepo,
  addShippingAddress as addShippingAddressRepo,
  createOrder as createOrderRepo,
  getCountryById as getCountryByIdRepo,
  createCTPGuestCart,
  getCTPCartById,
  addProductToCTPCart,
} from './cart.repository';


import {
  convertCart,
  convertAddToCartPayload,
  convertUpdateQuantityPayload,
  mapCart,
  convertRemoveProductFromCartPayload,
  convertToMagentoAddressInformationPayload,
  convertCTPCart,
  convertToCartUpdatePayload,
} from './utils/convert-cart';

const isCTP = process.env.CURRENT_BASE === 'CTP';

export const createGuestCart = async (): Promise<CustomCart> => {
  if (!isCTP) {
    try {
      const cartId = await createGuestCartRepo();

      return convertCart(cartId);
    } catch (err) {
      console.error(err);
      throw err;
    }
  } else {
    try {
      const response = await createCTPGuestCart();

      return convertCTPCart(response.body);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
};

export const getCartById = async (token: string): Promise<CustomCart> => {
  if (!isCTP) {
    try {
      const magentoCart = await getCartByIdRepo(token);
      const magentoProducts = await Promise.all(magentoCart.items.map((product) => getProduct(product.sku!)));

      return mapCart(magentoCart, token, magentoProducts);
    } catch (err) {
      console.log(err);
      throw err;
    }
  } else {
    try {
      const response = await getCTPCartById(token);

      return convertCTPCart(response.body);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
};

export const addProductToCart = async (payload: AddProductToCartPayload, cartId: string): Promise<any> => {
  if (!isCTP) {
    try {
      const cart = await getCartByIdRepo(cartId);
      const body: MagentoUpdateProductsInCartPayload = convertAddToCartPayload(payload, cart);

      return await addProductToCartRepo(body, cartId);
    } catch (err) {
      console.error(err);
      throw err;
    }
  } else {
    try {
      const ctpPayload = convertToCartUpdatePayload(payload);
      const cart = await addProductToCTPCart(ctpPayload, cartId);
      return cart;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

};

export const updateProductQuantity = async (payload: UpdateQuantityPayload, cartId: string): Promise<CustomProductInCart> => {
  const cart = await getCartByIdRepo(cartId);
  const body: MagentoUpdateProductsInCartPayload = convertUpdateQuantityPayload(payload, cart);

  return await updateProductQuantityRepo(body, cartId);
};

export const removeProductFromCart = async (payload: RemoveProductFromCartPayload, cartId: string): Promise<boolean> => {
  return await removeProductFromCartRepo(payload.RemoveLineItem.lineItemId, cartId);
};

export const addShippingAddress = async (payload: SetShippingAddressPayload, cartId: string): Promise<MagentoAddressInformationResponse> => {
  const country = await getCountryByIdRepo(payload.SetShippingAddress.country);
  const magentoPayload: MagentoAddressInformationPayload = convertToMagentoAddressInformationPayload(payload, country);

  return await addShippingAddressRepo(cartId, magentoPayload);
};

export const createOrder = async (cartId: string): Promise<number> => {
  const magentoPayload: MagentoCreateOrderPayload = {
    paymentMethod: {
      method: 'checkmo',
    },
  };

  return await createOrderRepo(cartId, magentoPayload);
};
