export interface MagentoCategory {
  id: string,
  parent_id: string,
  name: string,
  is_active: boolean,
  position: number,
  level: number,
  product_count: number,
  children_data: Array<MagentoCategory>
}
