import { OrderItem } from './order-item';

export interface OrderRequest {
  order_number: number;
  items: OrderItem[];
  order_comment: string | null;
}
