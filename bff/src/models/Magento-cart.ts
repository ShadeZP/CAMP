import { BundleProductOption } from './Magento-product.model';

export interface MagentoCart {
  id: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  is_virtual: boolean;
  items: MagentoAddProductInCart[];
  items_count: number;
  items_qty: number;
  customer: Customer;
  billing_address: BillingAddress;
  orig_order_id: number;
  currency: Currency;
  customer_is_guest: boolean;
  customer_note_notify: boolean;
  customer_tax_class_id: number;
  store_id: number;
  extension_attributes: ExtensionAttributes;
}

export interface Customer {
  email: string | null;
  firstname: string | null;
  lastname: string | null;
}

export interface BillingAddress {
  id: number;
  region: string | null;
  region_id: string | null;
  region_code: string | null;
  country_id: string | null;
  street: string[];
  telephone: string | null;
  postcode: string | null;
  city: string | null;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  same_as_billing: number; // you might want this to be a boolean
  save_in_address_book: number; // you might want this to be a boolean
}

export interface Currency {
  global_currency_code: string;
  base_currency_code: string;
  store_currency_code: string;
  quote_currency_code: string;
  store_to_base_rate: number;
  store_to_quote_rate: number;
  base_to_global_rate: number;
  base_to_quote_rate: number;
}

export interface ExtensionAttributes {
  shipping_assignments: any[];
}

export interface MagentoAddProductToCartPayload {
  cartItem: MagentoAddProductInCart
}

export interface MagentoAddProductInCart {
    item_id?: number | null,
    sku: string,
    qty: number,
    name?: string | null,
    price?: number | null,
    product_type?: string | null,
    quote_id: number,
    product_option?: BundleProductOption[],
    extension_attributes?: any,
}
