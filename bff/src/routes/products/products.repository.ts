import axios from 'axios';
import https from 'https';
import { MagentoProductResponse } from './models/Magento-product.model';

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});


export const getProducts = async ({ categoryId, offset, limit }: {
  categoryId: string,
  offset: string,
  limit: string
}): Promise<MagentoProductResponse> => {
  try {
    const categoryFilters = `categoryId=1&searchCriteria[filterGroups][0][filters][0][field]=category_id&searchCriteria[filterGroups][0][filters][0][value]=${categoryId}&searchCriteria[filterGroups][0][filters][0][condition_type]=eq`;
    const pageFilters = `searchCriteria[currentPage]=${offset}`;
    const pageSizeFilters = `searchCriteria[pageSize]=${limit}`;
    const url = `https://magento.test/rest/default/V1/products? + ${[pageFilters, pageSizeFilters, categoryFilters].join('&')}`;
    const response = await instance.get(url);
    return response.data;
  } catch (err) {
    console.log('err', err);
    throw err;
  }
};
