import { PromoLayout } from '../../models/Promo.model';
import { getPromo } from './promo.repository';
import { promoMap } from './utils/promo-map';


export const getPromoById = async (sku: string): Promise<PromoLayout> => {
  try {
    return promoMap(await getPromo(sku));
  } catch (err) {
    console.log('service err', err);
    throw err;
  }
};
