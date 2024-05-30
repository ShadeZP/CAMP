import { Cart, UpdateProductInCartPayload } from '../../models/Cart.model';
import { MagentoAddProductInCart, MagentoAddProductToCartPayload } from '../../models/Magento-cart';
import { getProduct } from '../product/product.repository';
import { createVariant } from '../product/utils/convert-product';
import {
  createGuestCart as createGuestCartRepo,
  getCarById,
  addProductToCart as addProductToCartRepo,
  getCartItems,
} from './cart.repository';


import { convertCart, covertAddToCartPayload, mapCart } from './utils/convert-cart';

export const createGuestCart = async (): Promise<Cart> => {
  const res = await createGuestCartRepo();
  return convertCart(res);
};

export const getCartById = async (token: string): Promise<Cart> => {
  const magentoCart = await getCarById(token);
  const magentoProducts = await Promise.all(magentoCart.items.map((product) => getProduct(product.sku)));
  return mapCart(magentoCart, token, magentoProducts);
};

export const addProductToCart = async (payload: UpdateProductInCartPayload, cartId: string) => {
  const [product, cart, items] = await Promise.all([getProduct(payload.AddLineItem.variantId), getCarById(cartId), getCartItems(cartId)]);
  console.log(items);

  const body: MagentoAddProductToCartPayload = covertAddToCartPayload(payload, product, cart);
  console.log(body);
  const magentoCart = await addProductToCartRepo(body, cartId);
  const magentoProducts = await Promise.all(magentoCart.items.map((product) => getProduct(product.sku)));

  return mapCart(magentoCart, cartId, magentoProducts);
};
