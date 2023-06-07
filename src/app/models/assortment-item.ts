import { AssortmentGroup } from './assortment-group';
import { AssortmentCategory } from './assortment-category';

export interface AssortmentItem {
  id: number;
  item_type: string;
  price: number;
  name: string;
  group_order: number;
  group: AssortmentGroup | null;
  category: AssortmentCategory;
}
