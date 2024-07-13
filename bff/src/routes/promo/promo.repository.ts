import axios from 'axios';
import https from 'https';
import { ContentEntriesPromoResponse, ContentEntryPromoResponse } from '../../models/Promo.model';

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});


async function getPromoMapping(): Promise<Record<string, string>> {
  const url = 'https://eu-cdn.contentstack.com/v3/content_types/promo/entries?environment=development&locale=en-us&include_fallback=true&include_branch=false';
  const res = await instance.get(url, {
    headers: {
      api_key: 'blt3adcdc02dee6023e',
      access_token: 'cs0b80c40ff7de2a5fbf04e19f',
    },
  });

  const allEntries: ContentEntriesPromoResponse = res.data;
  return allEntries.entries.reduce((acc, curr) => ({
    ...acc,
    [curr.sku]: curr.uid,
  }), {});
}

const promisePromoMapping = getPromoMapping();

export const getPromo = async (sku: string): Promise<ContentEntryPromoResponse> => {

  try {
    const promoMapping = await promisePromoMapping;
    const url = `https://eu-cdn.contentstack.com/v3/content_types/promo/entries/${promoMapping[sku]}?environment=development&locale=en-us&include_fallback=true&include_branch=false`;
    const res = await instance.get(url, {
      headers: {
        api_key: 'blt3adcdc02dee6023e',
        access_token: 'cs0b80c40ff7de2a5fbf04e19f',
      },
    });
    return res.data;
  } catch (err: any) {
    console.log('repo err', err);
    throw err;
  }
};

