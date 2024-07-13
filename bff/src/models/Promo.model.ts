export interface PromoLayout {
  sku: string;
  promos: {
    text: string;
    order: number;
  }[];
}

export interface ContentEntriesPromoResponse {
  entries: ContentEntryPromo[];
}

export interface ContentEntryPromoResponse {
  entry: ContentEntryPromo;
}

export interface ContentEntryPromo {
  uid: string;
  sku: string;
  promos: ContentPromo[];
}


export interface ContentPromo {
  title: string;
  text: string;
  order: number;
  img: {
    title: string;
    url: string;
  };
}
