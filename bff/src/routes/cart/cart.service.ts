import {
  Cart,
  AddProductToCartPayload,
  UpdateQuantityPayload,
  RemoveProductFromCartPayload, SetShippingAddressPayload,
} from '../../models/Cart.model';
import {
  MagentoUpdateProductsInCartPayload,
  MagentoProductInCart,
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
} from './cart.repository';


import {
  convertCart,
  covertAddToCartPayload,
  convertUpdateQuantityPayload,
  mapCart,
  convertRemoveProductFromCartPayload, convertToMagentoAddressInformationPayload,
} from './utils/convert-cart';

export const createGuestCart = async (): Promise<Cart> => {
  const cartId = await createGuestCartRepo();

  return convertCart(cartId);
};

export const getCartById = async (token: string): Promise<Cart> => {
  try {
    const magentoCart = await getCartByIdRepo(token);
    const magentoProducts = await Promise.all(magentoCart.items.map((product) => getProduct(product.sku!)));

    return mapCart(magentoCart, token, magentoProducts);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const addProductToCart = async (payload: AddProductToCartPayload, cartId: string): Promise<MagentoProductInCart> => {
  const cart = await getCartByIdRepo(cartId);
  const body: MagentoUpdateProductsInCartPayload = covertAddToCartPayload(payload, cart);

  return await addProductToCartRepo(body, cartId);
};

export const updateProductQuantity = async (payload: UpdateQuantityPayload, cartId: string): Promise<MagentoProductInCart> => {
  const cart = await getCartByIdRepo(cartId);
  const body: MagentoUpdateProductsInCartPayload = convertUpdateQuantityPayload(payload, cart);

  return await updateProductQuantityRepo(body, cartId);
};

export const removeProductFromCart = async (payload: RemoveProductFromCartPayload, cartId: string): Promise<boolean> => {
  return await removeProductFromCartRepo(payload.RemoveLineItem.lineItemId, cartId);
};

export const addShippingAddress = async (payload: SetShippingAddressPayload, cartId: string): Promise<MagentoAddressInformationResponse> => {
  const country = await getCountryByIdRepo(payload.SetShippingAddress.country);
  const magentoPayload: MagentoAddressInformationPayload = convertToMagentoAddressInformationPayload(payload , country);

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
