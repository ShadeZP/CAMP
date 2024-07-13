import { CategoryPagedQueryResponse, ClientResponse } from '@commercetools/platform-sdk';
import { Ancestor, CustomCategory, Parent } from '../../models/CustomCategory';
import { MagentoCategory } from '../../models/Magento-category';
import { getCategories as getCategoriesRepo, getCTPCategories } from './categories.repository';

function flattenData(data: MagentoCategory, parent: Parent | null = null, ancestors: Ancestor[] = []): CustomCategory[] {

  let newItem = {
    id: data.id,
    name: data.name,
    description: data.name,
    slug: data.id.toString(),
    parent: parent ? { id: parent.id } : null,
    ancestors: ancestors,
  };

  let result: CustomCategory[] = [newItem];

  if (data.children_data) {
    let newAncestors = ancestors.concat([{ type: 'category', id: data.id }]);
    for (let child of data.children_data) {
      result = result.concat(flattenData(child, newItem, newAncestors));
    }
  }

  return result;
}

function mapCPTCategories(response: ClientResponse<CategoryPagedQueryResponse>): CustomCategory[] {
  const categories = response.body.results;
  return categories.map((category): CustomCategory => {
    return {
      id: category.id,
      name: category.name['en-US'],
      description: category.description?.['en-US'] ?? '',
      slug: category.slug['en-US'],
      parent: category.parent ? { id: category.parent.id } : null,
      ancestors: category.ancestors.map((ancestor) => ({
        type: ancestor.typeId,
        id: ancestor.id,
      })),
    };
  });
}

export const getCategories = async (): Promise<CustomCategory[]> => {
  const isCTP = process.env.CURRENT_BASE === 'CTP';
  try {
    return isCTP ? mapCPTCategories(await getCTPCategories()) : flattenData(await getCategoriesRepo());
  } catch (err) {
    console.log(err);
    throw err;
  }
};


