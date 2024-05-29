import { Product, ProductResponse } from '../../models/Product.model';
import {
  getProduct as getProductRepo,
  getProducts as getProductsRepo,
  getProductsByIds,
} from '../product/product.repository';
import { convertProduct, convertProducts } from './utils/convert-product';


export const getProducts = async ({ categoryId, offset, limit }: {
  categoryId: string,
  offset: string,
  limit: string
}): Promise<ProductResponse | any> => {
  const productsForPlp = await getProductsRepo({ categoryId, offset, limit });
  const variantProductsId = productsForPlp.items.map((product) => product.extension_attributes.configurable_product_links).join(',');
  const variantProducts = await getProductsByIds(variantProductsId);

  return convertProducts(productsForPlp, variantProducts);
};

export const getProduct = async (sku: string): Promise<Product | any> => {
  const baseSCU = sku.split('-')[0];
  const magentoProduct = await getProductRepo(baseSCU);

  const variantProductsId = magentoProduct.extension_attributes.configurable_product_links.join(',');
  const variantProducts = await getProductsByIds(variantProductsId);

  return convertProduct(magentoProduct, variantProducts.items, sku);
};
