import axios from 'axios';
import https from 'https';
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
