import {
  Attribute,
  ClientResponse,
  Image, Price,
  Product,
  ProductPagedQueryResponse,
  ProductVariant,
  ProductVariantAvailability,
} from '@commercetools/platform-sdk';
import {
  CustomAttribute,
  MagentoProduct,
  MagentoProductResponse,
  MediaGalleryEntry,
} from '../../../models/Magento-product.model';
import {
  CustomAttributeObject,
  CustomImage,
  CustomProduct,
  CustomProductsResponse,
  CustomProductVariant, CustomProductAttribute, CustomPrice, CustomProductVariantAvailability,
} from '../../../models/Product.model';

export function findProduct(id: number, list: MagentoProduct[]): MagentoProduct {
  return list.find((product) => product.id === id)!;
}


export function convertProducts(productsForPlp: MagentoProductResponse, variantProducts: MagentoProductResponse): CustomProductsResponse {
  return {
    results: productsForPlp.items.map((item) => convertProduct(item, variantProducts.items)),
    total: productsForPlp.total_count,
    limit: productsForPlp.search_criteria.page_size,
    offset: productsForPlp.search_criteria.current_page,
  };
}

export function convertProduct(product: MagentoProduct, items: MagentoProduct[] = [], masterSCU = ''): CustomProduct {
  const attributes = createAttrObj(product.custom_attributes);
  const variants = product.extension_attributes.configurable_product_links?.map((id) => createVariant(findProduct(id, items))) || [];
  const masterVariant = masterSCU ? variants.find((product) => {
    return product.sku === masterSCU;
  })! : variants[0];
  return {
    id: String(product.id),
    name: product.name,
    description: attributes.description,
    slug: attributes.url_key,
    variants: variants,
    masterVariant: masterVariant,
  };
}

export function createVariant(product: MagentoProduct): CustomProductVariant {
  const attributes = createAttrObj(product.custom_attributes);
  const [, sizeLabel, colorLabel] = product.sku.split('-');

  return {
    id: product.id,
    sku: product.sku,
    prices: [{
      value: {
        currencyCode: 'USD',
        centAmount: product.price * 100,
      },
    }],
    images: mapImages(product.media_gallery_entries),
    attributes: [
      {
        name: 'Color',
        value: {
          key: attributes.color,
          label: colorLabel,
        },
      },
      {
        name: 'Size',
        value: {
          key: attributes.size,
          label: sizeLabel,
        },
      },
    ],
    slug: attributes.url_key,
    name: product.name,
  };
}

export function createAttrObj(custom_attributes: CustomAttribute[]): CustomAttributeObject {
  return custom_attributes.reduce((acc, cur) => ({
    ...acc,
    [cur.attribute_code]: cur.value,
  }), {});
}

export function mapImages(gallery: MediaGalleryEntry[]): CustomImage[] {
  return gallery.map((entry) => ({ url: `https://magento.test/pub/media/catalog/product${entry.file}` }));
}

export function transformToCustomProductsResponse(response: ProductPagedQueryResponse): CustomProductsResponse {
  return {
    results: response.results.map((product) => convertCTPProduct(product)),
    total: response.total ?? 0,
    limit: response.limit,
    offset: response.offset,
  };
}

export function convertCTPProduct(product: Product, sku?: string): CustomProduct {
  const { name, description, slug, masterVariant, variants } = product.masterData.current;

  const currentVariant = sku ? variants.find((product) => {
    return product.sku === sku;
  })! : masterVariant;

  return {
    id: product.id,
    name: name['en-US'],
    description: description?.['en-US'] ?? '',
    slug: slug['en-US'],
    variants: product.masterData.current.variants.map((variant) => transformCTPToProductVariant(variant, name['en-US'], slug['en-US'])),
    masterVariant: transformCTPToProductVariant(currentVariant, name['en-US'], slug['en-US']),
  };
}

function transformCTPToProductVariant(variant: ProductVariant, name: string, slug: string): CustomProductVariant {
  return {
    id: variant.id,
    sku: variant.sku ?? '',
    name,
    slug,
    images: variant.images?.map(transformCTPToImage) ?? [],
    prices: variant.prices?.map(transformCTPToPrice) ?? [],
    attributes: variant.attributes?.map(transformCTPToProductAttribute) ?? [],
    availability: variant.availability ? transformCTPToProductVariantAvailability(variant.availability) : undefined,
  };
}

function transformCTPToImage(image: Image): CustomImage {
  return {
    url: image.url,
  };
}

function transformCTPToPrice(price: Price): CustomPrice {
  return {
    value: {
      currencyCode: price.value.currencyCode,
      centAmount: price.value.centAmount,
    },
  };
}

function transformCTPToProductAttribute(attribute: Attribute): CustomProductAttribute {
  return {
    name: attribute.name,
    value: {
      key: attribute.value.key,
      label: attribute.value.label,
    },
  };
}

function transformCTPToProductVariantAvailability(availability: ProductVariantAvailability): CustomProductVariantAvailability {
  return {
    isOnStock: availability.isOnStock,
    availableQty: availability.availableQuantity,
  };
}
