import { Cart, CartLineItemsInner, CartTotalPrice, UpdateProductInCartPayload } from '../../../models/Cart.model';
import { MagentoAddProductInCart, MagentoAddProductToCartPayload, MagentoCart } from '../../../models/Magento-cart';
import { MagentoProduct } from '../../../models/Magento-product.model';
import { ProductVariant } from '../../../models/Product.model';
import { createVariant } from '../../product/utils/convert-product';

export const convertCart = (id: string): Cart => {
  return {
    id: id,
    version: 0,
    lineItems: [],
    totalPrice: {
      centAmount: 0,
      currencyCode: 'USD',
    },
    totalQuantity: 0,
  };
};

export const mapCart = (
  magentoCart: MagentoCart,
  token: string,
  magentoProducts: MagentoProduct[],
  version = 0): Cart => {
  const lineItems: CartLineItemsInner[] = magentoCart.items.map((item): CartLineItemsInner => ({
    id: item.item_id as number,
    quantity: item.qty,
    totalPrice: item.price as number,
    currencyCode: 'USD',
    variant: createVariant(magentoProducts.find(product => product.sku === item.sku)!),
  }));

  const getTotalPriceInCents = (lineItems: CartLineItemsInner[]): number => lineItems.reduce((acc, curr) => acc + curr.totalPrice * curr.quantity, 0) * 100;

  return {
    id: token,
    version,
    lineItems: lineItems,
    totalPrice: {
      centAmount: getTotalPriceInCents(lineItems),
      currencyCode: 'USD',
    },
    totalQuantity: magentoCart.items_qty,
  };
};

export const covertAddToCartPayload = (payload: UpdateProductInCartPayload, product: MagentoProduct, cart: MagentoCart): MagentoAddProductToCartPayload => {
  return {
    cartItem: {
      // item_id: product.id,
      item_id: null,
      // name: product.name,
      price: product.price,
      product_type: null,
      // product_type: product.type_id,
      quote_id: cart.id,
      sku: payload.AddLineItem.variantId,
      qty: payload.AddLineItem.quantity,
    },
  };
};
