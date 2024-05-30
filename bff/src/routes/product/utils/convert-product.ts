import {
  CustomAttribute,
  MagentoProduct,
  MagentoProductResponse,
  MediaGalleryEntry,
} from '../../../models/Magento-product.model';
import { AttributeObject, Image, Product, ProductResponse, ProductVariant } from '../../../models/Product.model';

export function findProduct(id: number, list: MagentoProduct[]): MagentoProduct {
  return list.find((product) => product.id === id)!;
}

export function convertProducts(productsForPlp: MagentoProductResponse, variantProducts: MagentoProductResponse): ProductResponse {
  return {
    results: productsForPlp.items.map((item) => convertProduct(item, variantProducts.items)),
    total: productsForPlp.total_count,
    limit: productsForPlp.search_criteria.page_size,
    offset: productsForPlp.search_criteria.current_page,
  };
}

export function createAttrObj(custom_attributes: CustomAttribute[]): AttributeObject {
  return custom_attributes.reduce((acc, cur) => ({
    ...acc,
    [cur.attribute_code]: cur.value,
  }), {});
}

export function mapImages(gallery: MediaGalleryEntry[]): Image[] {
  return gallery.map((entry) => ({ url: `https://magento.test/pub/media/catalog/product${entry.file}` }));
}

export function convertProduct(product: MagentoProduct, items: MagentoProduct[] = [], masterSCU = '',): Product {
  const attributes = createAttrObj(product.custom_attributes);
  const variants = product.extension_attributes.configurable_product_links?.map((id) => createVariant(findProduct(id, items))) || [];
  const masterVariant = masterSCU ? variants.find((product) => {
    return product.sku === masterSCU;
  })! : variants[0]
  return {
    id: product.id,
    name: product.name,
    description: attributes.description,
    slug: attributes.url_key,
    variants: variants,
    masterVariant: masterVariant,
  };
}

export function createVariant(product: MagentoProduct): ProductVariant {
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
