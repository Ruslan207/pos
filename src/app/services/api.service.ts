import { Injectable } from '@angular/core';
import { Observable, of, shareReplay } from 'rxjs';
import { AssortmentItem } from '../models/assortment-item';
import { OrderRequest } from '../models/order-request';
import { AssortmentItemType } from '../models/assortment-item-type';
import { AssortmentGroup } from '../models/assortment-group';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  getAssortment(): Observable<{items: AssortmentItem[]}> {
    return of({
      items: [
        {
          id: 0,
          item_type: AssortmentItemType.Coffee,
          price: 12,
          name: 'Чай',
          sort_order: 0,
          group: AssortmentGroup.LactoseFree,
        },
        {
          id: 0,
          item_type: AssortmentItemType.Coffee,
          price: 12,
          name: 'Чай',
          sort_order: 0,
          group: AssortmentGroup.LactoseFree,
        },
        {
          id: 0,
          item_type: AssortmentItemType.Coffee,
          price: 12,
          name: 'Чай',
          sort_order: 0,
          group: AssortmentGroup.LactoseFree,
        },
        {
          id: 0,
          item_type: AssortmentItemType.Coffee,
          price: 12,
          name: 'Чай',
          sort_order: 0,
          group: AssortmentGroup.LactoseFree,
        },
        {
          id: 0,
          item_type: AssortmentItemType.Coffee,
          price: 12,
          name: 'Чай',
          sort_order: 0,
          group: AssortmentGroup.LactoseFree,
        },
        {
          id: 0,
          item_type: AssortmentItemType.Coffee,
          price: 12,
          name: 'Чай',
          sort_order: 0,
          group: AssortmentGroup.Double,
        },
        {
          id: 0,
          item_type: AssortmentItemType.Coffee,
          price: 12,
          name: 'Чай',
          sort_order: 0,
          group: AssortmentGroup.Double,
        },
        {
          id: 0,
          item_type: AssortmentItemType.Coffee,
          price: 12,
          name: 'Чай asd',
          sort_order: 0,
          group: null,
        },
        {
          id: 0,
          item_type: AssortmentItemType.Coffee,
          price: 12,
          name: 'Чай 123',
          sort_order: 0,
          group: null,
        },
        {
          id: 0,
          item_type: AssortmentItemType.Coffee,
          price: 12,
          name: 'Чай ddd',
          sort_order: 0,
          group: null,
        },
        {
          id: 0,
          item_type: AssortmentItemType.Coffee,
          price: 12,
          name: 'Чай zxcasdasddsads',
          sort_order: 0,
          group: null,
        },
      ]
    })
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  makeOrder(order: OrderRequest): Observable<void> {
    return of(void 0);
  }
}
