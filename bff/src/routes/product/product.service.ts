import { CustomProduct, CustomProductsResponse } from '../../models/Product.model';
import {
  getCTPProduct,
  getCTPProducts,
  getProduct as getProductRepo,
  getProducts as getProductsRepo,
  getProductsByIds,
} from '../product/product.repository';
import {
  convertCTPProduct,
  convertProduct,
  convertProducts,
  transformToCustomProductsResponse,
} from './utils/convert-product';

const isCTP = process.env.CURRENT_BASE === 'CTP';

export const getProducts = async ({ categoryId, offset, limit }: {
  categoryId: string,
  offset: string,
  limit: string
}): Promise<CustomProductsResponse | any> => {
  if (!isCTP) {
    const productsForPlp = await getProductsRepo({ categoryId, offset, limit });
    const variantProductsId = productsForPlp.items.map((product) => product.extension_attributes.configurable_product_links).join(',');
    const variantProducts = await getProductsByIds(variantProductsId);
    return convertProducts(productsForPlp, variantProducts);

  } else {
    const res = await getCTPProducts({ categoryId, offset: Number(offset), limit: Number(limit) });
    return transformToCustomProductsResponse(res.body);
  }
};

export const getProduct = async (sku: string): Promise<CustomProduct | any> => {
  if (!isCTP) {
    const baseSCU = sku.split('-')[0];
    const magentoProduct = await getProductRepo(baseSCU);

    const variantProductsId = magentoProduct.extension_attributes.configurable_product_links.join(',');
    const variantProducts = await getProductsByIds(variantProductsId);

    return convertProduct(magentoProduct, variantProducts.items, sku);
  } else {
    try {
      const baseProduct = await getCTPProduct(sku);
      return convertCTPProduct(baseProduct.body.results[0], sku);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
