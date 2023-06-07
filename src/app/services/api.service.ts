import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { AssortmentItem } from '../models/assortment-item';
import { OrderRequest } from '../models/order-request';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private apiPrefix = 'https://king-prawn-app-4iymu.ondigitalocean.app';

  constructor(
    private httpClient: HttpClient,
  ) { }

  private assortment$ = this.httpClient.get<{items: AssortmentItem[]}>(`${this.apiPrefix}/assortment/`)
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  getAssortment(): Observable<{items: AssortmentItem[]}> {
    return this.assortment$;
  }

  makeOrder(order: OrderRequest): Observable<void> {
    return this.httpClient.post<void>(`${this.apiPrefix}/orders/`, order);
  }
}
