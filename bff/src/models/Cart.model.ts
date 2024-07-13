import { CustomProductVariant } from './Product.model';

export interface MagentoCreateCartResponse {
  id: string;
}

export interface CartTotalPrice {
  currencyCode: string;
  centAmount: number;
}

export interface CartLineItemsInner {
  id: number | string;
  variant: CustomProductVariant;
  quantity: number;
  totalPrice: number;
  currencyCode?: string;
}

export interface CustomCart {
  id: string | number;
  version?: number;
  customerId?: string;
  lineItems: CartLineItemsInner[];
  totalPrice: CartTotalPrice;
  totalQuantity: number | undefined;
}

export type CartsIdPutRequestUpdateAction = 'AddLineItem' | 'ChangeLineItemQuantity' | 'Recalculate' | 'RemoveLineItem';

export type OrdersIdPutRequestUpdateAction = 'ChangeOrderState' | 'SetBillingAddress' | 'SetShippingAddress';

export interface AddProductToCartPayload {
  version: number,
  action: CartsIdPutRequestUpdateAction,
  AddLineItem: {
    variantId: string,
    quantity: number
  }
}

export interface UpdateQuantityPayload {
  version: number,
  action: CartsIdPutRequestUpdateAction,
  ChangeLineItemQuantity: {
    lineItemId: number,
    quantity: number
  }
}

export interface RemoveProductFromCartPayload {
  version: number,
  action: CartsIdPutRequestUpdateAction,
  RemoveLineItem: {
    lineItemId: number,
    quantity: number
  }
}

export interface SetShippingAddressPayload {
  version: number,
  action: OrdersIdPutRequestUpdateAction,
  SetShippingAddress: Address
}

export interface Address {
  id: string;
  country: string;
  title: string;
  firstName: string;
  lastName: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  region: string;
  state: string;
  email: string;
}


