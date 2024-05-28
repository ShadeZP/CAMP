export interface MagentoProduct {
  id: number;
  sku: string;
  name: string;
  attribute_set_id: number;
  price: number;
  status: number;
  visibility: number;
  type_id: string;
  created_at: string;
  updated_at: string;
  weight: number;
  extension_attributes: ExtensionAttributes;
  product_links: ProductLink[];
  options: Option[];
  media_gallery_entries: MediaGalleryEntry[];
  tier_prices: TierPrice[];
  custom_attributes: CustomAttribute[];
}

export interface ExtensionAttributes {
  website_ids: number[];
  category_links: CategoryLink[];
  discounts: Discount[];
  bundle_product_options: BundleProductOption[];
  stock_item: StockItem;
  downloadable_product_links: DownloadableProductLink[];
  downloadable_product_samples: DownloadableProductSample[];
  giftcard_amounts: GiftcardAmount[];
  configurable_product_options: ConfigurableProductOption[];
  configurable_product_links: number[];
}

export interface CategoryLink {
  position: number;
  category_id: string;
  extension_attributes: any;
}

export interface Discount {
  discount_data: DiscountData;
  rule_label: string;
  rule_i_d: number;
}

export interface DiscountData {
  amount: number;
  base_amount: number;
  original_amount: number;
  base_original_amount: number;
}

export interface BundleProductOption {
  option_id: number;
  title: string;
  required: boolean;
  type: string;
  position: number;
  product_links: BundleProductLink[];
  extension_attributes: any;
}

export interface BundleProductLink {
  id: null;
  sku: null;
  option_id: null;
  qty: null;
  position: null;
  is_default: null;
  price: null;
  price_type: null;
  can_change_quantity: null;
  extension_attributes: null;
}

export interface StockItem {
  item_id: number;
  product_id: number;
  stock_id: number;
  qty: number;
  is_in_stock: boolean;
  is_qty_decimal: boolean;
  show_default_notification_message: boolean;
  use_config_min_qty: boolean;
  min_qty: number;
  use_config_min_sale_qty: number;
  min_sale_qty: number;
  use_config_max_sale_qty: boolean;
  max_sale_qty: number;
  use_config_backorders: boolean;
  backorders: number;
  use_config_notify_stock_qty: boolean;
  notify_stock_qty: number;
  use_config_qty_increments: boolean;
  qty_increments: number;
  use_config_enable_qty_inc: boolean;
  enable_qty_increments: boolean;
  use_config_manage_stock: boolean;
  manage_stock: boolean;
  low_stock_date: string;
  is_decimal_divided: boolean;
  stock_status_changed_auto: number;
  extension_attributes: any;
}

export interface DownloadableProductLink {
  id: number;
  title: string;
  sort_order: number;
  is_shareable: number;
  price: number;
  number_of_downloads: number;
  link_type: string;
  link_file: string;
  link_file_content: LinkFileContent;
  link_url: string;
  sample_type: string;
  sample_file: string;
  sample_file_content: LinkFileContent;
  sample_url: string;
  extension_attributes: any;
}

export interface DownloadableProductSample {
  id: number;
  title: string;
  sort_order: number;
  sample_type: string;
  sample_file: string;
  sample_file_content: LinkFileContent;
  sample_url: string;
  extension_attributes: any;
}

export interface LinkFileContent {
  file_data: string;
  name: string;
  extension_attributes: any;
}

export interface GiftcardAmount {
  attribute_id: number;
  website_id: number;
  value: number;
  website_value: number;
  extension_attributes: any;
}

export interface ConfigurableProductOption {
  id: number;
  attribute_id: string;
  label: string;
  position: number;
  is_use_default: boolean;
  values: ConfigurableProductOptionValue[];
  extension_attributes: any;
  product_id: number;
}

export interface ConfigurableProductOptionValue {
  value_index: null;
  extension_attributes: null;
}

export interface ProductLink {
  sku: string;
  link_type: string;
  linked_product_sku: string;
  linked_product_type: string;
  position: number;
  extension_attributes: {qty: number};
}

export interface Option {
  product_sku: string;
  option_id: number;
  title: string;
  type: string;
  sort_order: number;
  is_require: true;
  price: number;
  price_type: string;
  sku: string;
  file_extension: string;
  max_characters: number;
  image_size_x: number;
  image_size_y: number;
  values: OptionValue[];
  extension_attributes: any;
}

export interface OptionValue {
  title: string;
  sort_order: number;
  price: number;
  price_type: string;
  sku: string;
  option_type_id: number;
}

export interface MediaGalleryEntry {
  id: number;
  media_type: string;
  label: string;
  position: number;
  disabled: boolean;
  types: string[];
  file: string;
  content: Content;
  extension_attributes: {video_content: VideoContent};
}

export interface Content {
  base64_encoded_data: string;
  type: string;
  name: string;
}

export interface VideoContent {
  media_type: string;
  video_provider: string;
  video_url: string;
  video_title: string;
  video_description: string;
  video_metadata: string;
}

export interface TierPrice {
  customer_group_id: number;
  qty: number;
  value: number;
  extension_attributes: {percentage_value: number, website_id: number};
}

export interface CustomAttribute {
  attribute_code: string;
  value: string;
}

export interface FilterGroup {
  filters: Filter[];
}

export interface Filter {
  field: string;
  value: string;
  condition_type: string;
}

export interface SortOrder {
  field: string;
  direction: string;
}

export interface SearchCriteria {
  filter_groups: FilterGroup[];
  sort_orders: SortOrder[];
  page_size: number;
  current_page: number;
}

export interface MagentoProductResponse {
  items: MagentoProduct[];
  search_criteria: SearchCriteria;
  total_count: number;
}
