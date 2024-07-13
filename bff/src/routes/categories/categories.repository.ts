import { CategoryPagedQueryResponse, ClientResponse } from '@commercetools/platform-sdk';
import axios from 'axios';
import https from 'https';
import { rootClient } from '../../BuildClient';
import { MagentoCategory } from '../../models/Magento-category';

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});


export const getCategories = async (): Promise<MagentoCategory> => {
  try {
    const response = await instance.get('https://magento.test/rest/default/V1/categories');
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getCTPCategories = async (): Promise<ClientResponse<CategoryPagedQueryResponse>> => {
  try {
    return await rootClient.categories().get().execute();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
