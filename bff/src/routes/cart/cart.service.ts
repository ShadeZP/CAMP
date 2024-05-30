import {
  Cart,
  AddProductToCartPayload,
  UpdateQuantityPayload,
  RemoveProductFromCartPayload,
} from '../../models/Cart.model';
import { MagentoUpdateProductsInCartPayload, MagentoProductInCart } from '../../models/Magento-cart';
import { getProduct } from '../product/product.repository';
import {
  addProductToCart as addProductToCartRepo,
  createGuestCart as createGuestCartRepo,
  getCartById as getCartByIdRepo,
  updateProductQuantity as updateProductQuantityRepo,
  removeProductFromCart as removeProductFromCartRepo,
} from './cart.repository';


import {
  convertCart,
  covertAddToCartPayload,
  convertUpdateQuantityPayload,
  mapCart,
  convertRemoveProductFromCartPayload,
} from './utils/convert-cart';

export const createGuestCart = async (): Promise<Cart> => {
  const cartId = await createGuestCartRepo();

  return convertCart(cartId);
};

export const getCartById = async (token: string): Promise<Cart> => {
  const magentoCart = await getCartByIdRepo(token);
  const magentoProducts = await Promise.all(magentoCart.items.map((product) => getProduct(product.sku!)));

  return mapCart(magentoCart, token, magentoProducts);
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
