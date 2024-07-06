import { ClientResponse, Product, ProductPagedQueryResponse } from '@commercetools/platform-sdk';
import axios from 'axios';
import https from 'https';
import { rootClient } from '../../BuildClient';
import { MagentoProduct, MagentoProductResponse } from '../../models/Magento-product.model';

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export const getProductsByIds = async (ids: string): Promise<MagentoProductResponse> => {
  const filterForVariantProducts = `searchCriteria[filterGroups][0][filters][0][field]=entity_id&searchCriteria[filterGroups][0][filters][0][value]=${ids}&searchCriteria[filterGroups][0][filters][0][conditionType]=in`;
  const urlForVariantProducts = `https://magento.test/rest/default/V1/products? + ${filterForVariantProducts}`;
  const variantProducts = await instance.get(urlForVariantProducts);
  return variantProducts.data;
};

export const getProducts = async ({ categoryId, offset, limit }: {
  categoryId: string,
  offset: string,
  limit: string
}): Promise<MagentoProductResponse> => {
  try {
    const visibilityFilters = `searchCriteria[filterGroups][0][filters][1][field]=visibility&searchCriteria[filterGroups][0][filters][1][value]=4&searchCriteria[filterGroups][0][filters][1][condition_type]=eq`;
    const categoryFilters = `searchCriteria[filterGroups][0][filters][0][field]=category_id&searchCriteria[filterGroups][0][filters][0][value]=${categoryId}&searchCriteria[filterGroups][0][filters][0][condition_type]=eq`;
    const pageFilters = `searchCriteria[currentPage]=${offset}`;
    const pageSizeFilters = `searchCriteria[pageSize]=${limit}`;
    const url = `https://magento.test/rest/default/V1/products? + ${[pageFilters, pageSizeFilters, categoryFilters, visibilityFilters].join('&')}`;
    const productsForPlp = await instance.get(url);

    return productsForPlp.data;
  } catch (err) {
    console.log('err', err);
    throw err;
  }
};

export const getProduct = async (sku: string): Promise<MagentoProduct> => {
  try {
    const url = `https://magento.test/rest/default/V1/products/${sku}`;
    const response = await instance.get(url);
    return response.data;
  } catch (err) {
    console.log('err', err);
    throw err;
  }
};

export const getCTPProducts = async ({ categoryId, offset, limit }: {
  categoryId: string,
  offset: number,
  limit: number
}): Promise<ClientResponse<ProductPagedQueryResponse>> => {
  try {
    return rootClient
      .products()
      .get({
        queryArgs: {
          where: `masterData(current(categories(id="${categoryId}")))`,
          limit,
          offset,
        },
      })
      .execute();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getCTPProduct = async (sku: string): Promise<ClientResponse<ProductPagedQueryResponse>> => {
  console.log(sku)
  try {
    return rootClient
      .products()
      .get({
        queryArgs: {
          where: `masterData(current(variants(sku="${sku}")))`,
        },
      })
      .execute();
  } catch (err) {
    console.log(err);
    throw err;
  }

};

