import { Injectable, signal } from '@angular/core';
import { AssortmentItem } from '../models/assortment-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  readonly cart = new Map<number, number>();
  comment = signal<string | null>(null);
  orderNumber = signal<number | null>(null);

  constructor() { }

  resetCart(): void {
    this.cart.clear();
    this.comment.set(null);
    this.orderNumber.set(null);
  }

  addItemToCart(item: AssortmentItem): void {
    if (!this.cart.has(item.id)) {
      this.cart.set(item.id, 0);
    }
    const num = this.cart.get(item.id) ?? 0;
    this.cart.set(item.id, num + 1);
  }

  removeItem(item: AssortmentItem): void {
    this.cart.delete(item.id);
  }

  incrementItem(item: AssortmentItem): void {
    const current = this.cart.get(item.id);
    this.cart.set(item.id, (current ?? 0) + 1);
  }

  decrementItem(item: AssortmentItem): void {
    const current = this.cart.get(item.id);
    this.cart.set(item.id, (current ?? 0) - 1);
    if ((this.cart.get(item.id) ?? 0) <= 0) {
      this.removeItem(item);
    }
  }
}
