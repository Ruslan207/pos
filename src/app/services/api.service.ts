import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AssortmentItem } from '../models/assortment-item';
import { OrderRequest } from '../models/order-request';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  getAssortment(): Observable<{items: AssortmentItem[]}> {
    return of({
      items: [

      ]
    })
  }

  makeOrder(order: OrderRequest): Observable<void> {
    return of(void 0);
  }
}
