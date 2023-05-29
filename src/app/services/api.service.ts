import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { AssortmentItem } from '../models/assortment-item';
import { OrderRequest } from '../models/order-request';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  private assortment$ = this.httpClient.get<{items: AssortmentItem[]}>('https://dummyjson.com/products')
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  getAssortment(): Observable<{items: AssortmentItem[]}> {
    return this.assortment$;
  }

  makeOrder(order: OrderRequest): Observable<void> {
    return this.httpClient.post<void>('https://dummyjson.com/products/add', order);
  }
}
