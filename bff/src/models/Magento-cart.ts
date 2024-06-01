import { BundleProductOption } from './Magento-product.model';

export interface MagentoCart {
  id: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  is_virtual: boolean;
  items: MagentoProductInCart[];
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
  shipping_assignments: Shipping[];
}

export interface Shipping {
  shipping: {
    address: BillingAddress,
    method: string,
    extension_attributes: any,
  };
}

export interface MagentoUpdateProductsInCartPayload {
  cartItem: MagentoProductInCart;
}

export interface MagentoProductInCart {
  item_id?: number | null,
  sku?: string,
  qty: number,
  name?: string | null,
  price?: number | null,
  product_type?: string | null,
  quote_id: number,
  product_option?: BundleProductOption[],
  extension_attributes?: any,
}

export interface MagentoAddressInformationPayload {
  addressInformation: CheckoutDataShippingInformationInterface;
}

export interface CheckoutDataShippingInformationInterface {
  billing_address?: QuoteDataAddressInterface;
  custom_attributes?: FrameworkAttributeInterface[];
  extension_attributes?: CheckoutDataShippingInformationExtensionInterface;
  shipping_address: QuoteDataAddressInterface;
  shipping_carrier_code: string;
  shipping_method_code: string;
}

export interface CheckoutDataShippingInformationExtensionInterface {
  // Define properties for any additional extension attributes here
}

export interface QuoteDataAddressInterface {
  city: string;
  company?: string;
  country_id: string;
  custom_attributes?: FrameworkAttributeInterface[];
  customer_address_id?: number;
  customer_id?: number;
  email: string;
  extension_attributes?: QuoteDataAddressExtensionInterface;
  fax?: string;
  firstname: string;
  id?: number;
  lastname: string;
  middlename?: string;
  postcode: string;
  prefix?: string;
  region: string;
  region_code: string;
  region_id: string;
  same_as_billing?: number;
  save_in_address_book?: number;
  street: string[];
  suffix?: string;
  telephone: string;
  vat_id?: string;
}

export interface QuoteDataAddressExtensionInterface {
  discounts?: SalesRuleDataRuleDiscountInterface[];
  gift_registry_id?: number;
  pickup_location_code?: string;
}

export interface SalesRuleDataRuleDiscountInterface {
  discount_data: SalesRuleDataDiscountDataInterface;
  rule_i_d: number;
  rule_label: string;
}

export interface SalesRuleDataDiscountDataInterface {
  amount: number;
  base_amount: number;
  base_original_amount: number;
  original_amount: number;
}

export interface FrameworkAttributeInterface {
  attribute_code: string;
  value: string;
}

export interface MagentoAddressInformationResponse {
  payment_methods: PaymentMethod[];
  totals: TotalsInterface;
  extension_attributes: {};
}

export interface PaymentMethod {
  code: string;
  title: string;
}

export interface TotalsInterface {
  base_currency_code: string;
  base_discount_amount: number;
  base_grand_total: number;
  base_shipping_amount: number;
  base_shipping_discount_amount: number;
  base_shipping_incl_tax: number;
  base_shipping_tax_amount: number;
  base_subtotal: number;
  base_subtotal_incl_tax: number;
  base_subtotal_with_discount: number;
  base_tax_amount: number;
  base_to_quote_rate: number;
  coupon_code: string;
  discount_amount: number;
  extension_attributes: TotalsExtensionAttributesInterface;
  grand_total: number;
  items: QuoteItemInterface[];
  items_qty: number;
  quote_currency_code: string;
  shipping_amount: number;
  shipping_discount_amount: number;
  shipping_incl_tax: number;
  shipping_tax_amount: number;
  subtotal: number;
  subtotal_incl_tax: number;
  subtotal_with_discount: number;
  total_segments: TotalSegmentInterface[];
  weee_tax_applied_amount: number;
}

export interface TotalsExtensionAttributesInterface {
  base_customer_balance_amount: number;
  base_reward_currency_amount: number;
  coupon_codes: string[];
  coupon_label: string;
  coupons_labels: string[];
  customer_balance_amount: number;
  negotiable_quote_totals: NegotiableQuoteTotalsInterface;
  reward_currency_amount: number;
  reward_points_balance: number;
}

export interface NegotiableQuoteTotalsInterface {
  base_cost_total: number;
  base_original_price_incl_tax: number;
  base_original_tax: number;
  base_original_total: number;
  base_to_quote_rate: number;
  cost_total: number;
  created_at: string;
  customer_group: number;
  items_count: number;
  negotiated_price_type: number;
  negotiated_price_value: number;
  original_price_incl_tax: number;
  original_tax: number;
  original_total: number;
  quote_status: string;
  updated_at: string;
}

export interface TotalSegmentInterface {
  area: string;
  code: string;
  extension_attributes: {
    gift_cards: string;
    gw_add_card: string;
    gw_allow_gift_receipt: string;
    gw_base_price: string;
    gw_base_price_incl_tax: string;
    gw_base_tax_amount: string;
    gw_card_base_price: string;
    gw_card_base_price_incl_tax: string;
    gw_card_base_tax_amount: string;
    gw_card_price: string;
    gw_card_price_incl_tax: string;
    gw_card_tax_amount: string;
    gw_items_base_price: string;
    gw_items_base_price_incl_tax: string;
    gw_items_base_tax_amount: string;
    gw_items_price: string;
    gw_items_price_incl_tax: string;
    gw_items_tax_amount: string;
    gw_order_id: string;
    gw_price: string;
    gw_price_incl_tax: string;
    gw_tax_amount: string;
    tax_grandtotal_details: TaxGrandTotalDetailsInterface[];
  };
  title: string;
  value: number;
}

export interface TaxGrandTotalDetailsInterface {
  amount: number;
  group_id: number;
  rates: (null | undefined)[];
}

export interface QuoteItemInterface {
  base_discount_amount: number;
  base_price: number;
  base_price_incl_tax: number;
  base_row_total: number;
  base_row_total_incl_tax: number;
  base_tax_amount: number;
  discount_amount: number;
  discount_percent: number;
  extension_attributes: {
    negotiable_quote_item_totals: NegotiableQuoteItemTotalsInterface;
  };
  item_id: number;
  name: string;
  options: string;
  price: number;
  price_incl_tax: number;
  qty: number;
  row_total: number;
  row_total_incl_tax: number;
  row_total_with_discount: number;
  tax_amount: number;
  tax_percent: number;
  weee_tax_applied: string;
  weee_tax_applied_amount: number;
}

export interface NegotiableQuoteItemTotalsInterface {
  base_cart_price: number;
  base_cart_price_incl_tax: number;
  base_cart_tax: number;
  base_catalog_price: number;
  base_catalog_price_incl_tax: number;
  cart_price: number;
  cart_price_incl_tax: number;
  cart_tax: number;
  catalog_price: number;
  catalog_price_incl_tax: number;
  cost: number;
  extension_attributes: {};
}

export interface MagentoCreateOrderPayload {
  paymentMethod: {
    po_number?: string,
    method: string,
    additional_data?: string[],
    extension_attributes?: {
      agreement_ids: string[]
    }
  };
}

export interface Region {
  id: string;
  code: string;
  name: string;
  extension_attributes: any;
}

export interface Country {
  id: string;
  two_letter_abbreviation: string;
  three_letter_abbreviation: string;
  full_name_locale: string;
  full_name_english: string;
  available_regions: Region[];
  extension_attributes: any;
}
