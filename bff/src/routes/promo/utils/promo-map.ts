import { ContentEntryPromoResponse, PromoLayout } from '../../../models/Promo.model';

export const promoMap = ({ entry }: ContentEntryPromoResponse): PromoLayout => {
  return {
    sku: entry.sku,
    promos: entry.promos.map((promo) => {
      return {
        text: `
                               <div class="p-4 my-2 flex h-[300px] shadow-lg rounded-xl">
                                    <div class="flex-grow">
                                        <h2 class="text-2xl font-serif">${promo.title}</h2>
                                        <p>${promo.text}</p>
                                    </div>
                                    <div>
                                        <img src="${promo.img.url}" alt="${promo.img.title}" 
                                            class="h-[100%] rounded-xl"
                                        />
                                    </div>
                                </div>
                            `,
        order: promo.order,
      };
    }),
  };
};
