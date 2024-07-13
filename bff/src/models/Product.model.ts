export interface CustomProductsResponse {
  results: CustomProduct[];
  total: number;
  limit: number;
  offset: number;
}

export interface CustomProduct {
  id: string;
  name: string;
  description: string;
  slug: string;
  variants: CustomProductVariant[];
  masterVariant: CustomProductVariant;
}

export interface CustomProductVariantAvailability {
  isOnStock?: boolean;
  availableQty?: number;
}

export interface CustomProductVariant {
  id: number;
  sku: string;
  name: string;
  slug: string;
  images: CustomImage[];
  prices: CustomPrice[];
  attributes: CustomProductAttribute[];
  availability?: CustomProductVariantAvailability;
}

export interface CustomPrice {
  value: {
    currencyCode: string;
    centAmount: number;
  };
}

export interface CustomImage {
  url: string;
}

export interface CustomProductAttribute {
  name: string;
  value: {
    key:string;
    label: string;
  };
}

export interface CustomAttributeObject {
  [key: string] : string;
}
