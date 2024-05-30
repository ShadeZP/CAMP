import { ProductVariant } from './Product.model';

export interface MagentoCreateCartResponse {
  id: string;
}

export interface CartTotalPrice {
  currencyCode: string;
  centAmount: number;
}

export interface CartLineItemsInner {
  id: number;
  variant: ProductVariant;
  quantity: number;
  totalPrice: number;
  currencyCode: string;
}

export interface Cart {
  id: string | number;
  version?: number;
  customerId?: string;
  lineItems: CartLineItemsInner[];
  totalPrice: CartTotalPrice;
  totalQuantity: number;
}

export type CartsIdPutRequestUpdateAction =
  | 'AddLineItem'
  | 'ChangeLineItemQuantity'
  | 'Recalculate'
  | 'RemoveLineItem'

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
