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
          id: 1,
          item_type: AssortmentItemType.Coffee,
          price: 12,
          name: 'Чай',
          sort_order: 0,
          group: AssortmentGroup.LactoseFree,
        },
        {
          id: 2,
          item_type: AssortmentItemType.Coffee,
          price: 12,
          name: 'Чай',
          sort_order: 0,
          group: AssortmentGroup.LactoseFree,
        },
        {
          id: 3,
          item_type: AssortmentItemType.Coffee,
          price: 12,
          name: 'Чай',
          sort_order: 0,
          group: AssortmentGroup.LactoseFree,
        },
        {
          id: 4,
          item_type: AssortmentItemType.Coffee,
          price: 12,
          name: 'Чай',
          sort_order: 0,
          group: AssortmentGroup.LactoseFree,
        },
        {
          id: 5,
          item_type: AssortmentItemType.Coffee,
          price: 12,
          name: 'Чай',
          sort_order: 0,
          group: AssortmentGroup.Double,
        },
        {
          id: 6,
          item_type: AssortmentItemType.Coffee,
          price: 12,
          name: 'Чай',
          sort_order: 0,
          group: AssortmentGroup.Double,
        },
        {
          id: 7,
          item_type: AssortmentItemType.Coffee,
          price: 12,
          name: 'Чай asd',
          sort_order: 0,
          group: null,
        },
        {
          id: 8,
          item_type: AssortmentItemType.Coffee,
          price: 12,
          name: 'Чай 123',
          sort_order: 0,
          group: null,
        },
        {
          id: 9,
          item_type: AssortmentItemType.Coffee,
          price: 12,
          name: 'Чай ddd',
          sort_order: 0,
          group: null,
        },
        {
          id: 10,
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
    console.log(order);
    return of(void 0);
  }
}
