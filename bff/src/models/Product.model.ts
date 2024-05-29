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
  variants: Variant[];
  masterVariant: Variant;
}

export interface Variant {
  id: number;
  sku: string;
  prices: Price[];
  images: Image[];
  attributes: Attribute[];
  slug: string;
  name: string;
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

export interface Attribute {
  name: string;
  value: {
    key:string;
    label: string;
  };
}

export interface AttributeObject {
  [key: string] : string;
}
