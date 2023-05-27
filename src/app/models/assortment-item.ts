import { AssortmentGroup } from './assortment-group';
import { AssortmentItemType } from './assortment-item-type';

export interface AssortmentItem {
  id: number;
  item_type: AssortmentItemType;
  price: number;
  name: string;
  sort_order: number;
  group: AssortmentGroup | null;
}
