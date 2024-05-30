export interface ProductResponse {
  results: Product[];
  total: number;
  limit: number;
  offset: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  slug: string;
  variants: ProductVariant[];
  masterVariant: ProductVariant;
}

export interface ProductVariantAvailability {
  isOnStock?: boolean;
  availableQty?: number;
}

export interface ProductVariant {
  id: number;
  sku: string;
  name: string;
  slug: string;
  images: Image[];
  prices: Price[];
  attributes: ProductAttribute[];
  availability?: ProductVariantAvailability;
}

export interface Price {
  value: {
    currencyCode: string;
    centAmount: number;
  };
}

export interface Image {
  url: string;
}

export interface ProductAttribute {
  name: string;
  value: {
    key:string;
    label: string;
  };
}

export interface AttributeObject {
  [key: string] : string;
}
