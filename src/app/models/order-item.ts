import { AssortmentItemType } from './assortment-item-type';

export interface OrderItem {
  id: number;
  item_type: AssortmentItemType;
  price: number;
  name: string;
}
