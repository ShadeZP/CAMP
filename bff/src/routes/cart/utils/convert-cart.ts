import {
  Cart,
  CartLineItemsInner,
  AddProductToCartPayload,
  UpdateQuantityPayload, RemoveProductFromCartPayload, SetShippingAddressPayload,
} from '../../../models/Cart.model';
import {
  MagentoUpdateProductsInCartPayload,
  MagentoCart,
  MagentoAddressInformationPayload,
  QuoteDataAddressInterface,
  CheckoutDataShippingInformationInterface,
  Country,
  Region,
} from '../../../models/Magento-cart';
import { MagentoProduct } from '../../../models/Magento-product.model';
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
  version = 0,
): Cart => {
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

export const covertAddToCartPayload = (payload: AddProductToCartPayload, cart: MagentoCart): MagentoUpdateProductsInCartPayload => {
  return {
    cartItem: {
      quote_id: cart.id,
      sku: payload.AddLineItem.variantId,
      qty: payload.AddLineItem.quantity,
    },
  };
};

export const convertUpdateQuantityPayload = (payload: UpdateQuantityPayload, cart: MagentoCart): MagentoUpdateProductsInCartPayload => {
  return {
    cartItem: {
      item_id: payload.ChangeLineItemQuantity.lineItemId,
      quote_id: cart.id,
      qty: payload.ChangeLineItemQuantity.quantity,
    },
  };
};

export const convertRemoveProductFromCartPayload = (payload: RemoveProductFromCartPayload, cart: MagentoCart): MagentoUpdateProductsInCartPayload => {
  return {
    cartItem: {
      item_id: payload.RemoveLineItem.lineItemId,
      quote_id: cart.id,
      qty: payload.RemoveLineItem.quantity,
    },
  };
};

export const convertToMagentoAddressInformationPayload = (setShippingAddressPayload: SetShippingAddressPayload, country: Country): MagentoAddressInformationPayload => {
  const address = setShippingAddressPayload.SetShippingAddress;
  const region: Region = country.available_regions.find((region) => region.name === address.region)!;

  const magentoAddress: QuoteDataAddressInterface = {
    city: address.city,
    country_id: address.country,
    email: address.email,
    firstname: address.firstName,
    lastname: address.lastName,
    postcode: address.postalCode,
    region: address.region,
    street: [address.streetName],
    telephone: '512-555-1111',
    region_code: region.code, // Assuming this field is not available in the source, you can add logic to set it if needed
    region_id: region.id, // Assuming this field is not available in the source, you can add logic to set it if needed
  };

  const magentoAddressInformation: CheckoutDataShippingInformationInterface = {
    billing_address: magentoAddress,
    shipping_address: magentoAddress,
    shipping_carrier_code: 'flatrate', // Assuming this field is not available in the source, you can add logic to set it if needed
    shipping_method_code: 'flatrate', // Assuming this field is not available in the source, you can add logic to set it if needed
  };

  return {
    addressInformation: magentoAddressInformation,
  };
};

