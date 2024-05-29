import { getCategories as getCategoriesRepo } from './categories.repository';
import { Ancestor, Category, Parent } from '../../models/Category';
import { MagentoCategory } from '../../models/Magento-category';

function flattenData(data: MagentoCategory, parent: Parent | null = null, ancestors: Ancestor[] = []): Category[] {

  let newItem = {
    id: data.id,
    name: data.name,
    description: data.name,
    slug: data.id.toString(),
    parent: parent ? { id: parent.id } : null,
    ancestors: ancestors,
  };

  let result: Category[] = [newItem];

  if (data.children_data) {
    let newAncestors = ancestors.concat([{ type: 'category', id: data.id }]);
    for (let child of data.children_data) {
      result = result.concat(flattenData(child, newItem, newAncestors));
    }
  }

  return result;
}


export const getCategories = async (): Promise<Category[]> => {
  const res = await getCategoriesRepo();

  return flattenData(res);
};
