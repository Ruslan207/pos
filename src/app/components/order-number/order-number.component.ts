import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { switchMap, take } from 'rxjs';
import { AssortmentItem } from '../../models/assortment-item';

@Component({
  selector: 'app-order-number',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, MatSnackBarModule],
  templateUrl: './order-number.component.html',
  styleUrls: ['./order-number.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderNumberComponent implements AfterViewInit {
  @ViewChild(MatInput, { static: true }) orderNumberInput: MatInput | null = null;
  constructor(
    private cartService: CartService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private snackBar: MatSnackBar,
    private apiService: ApiService,
  ) {}

  ngAfterViewInit(): void {
    this.orderNumberInput?.focus();
    this.cd.detectChanges();
  }

  setOrderNumber(orderNumber: number | null): void {
    this.cartService.orderNumber.set(orderNumber);
  }

  submitOrder() {
    const orderNumber = this.cartService.orderNumber();
    if (orderNumber === null) {
      this.snackBar.open('❌ Номер заказу null', undefined, {
        duration: 3000,
      });
      return;
    }
    this.apiService.getAssortment()
      .pipe(
        switchMap(assortment => {
          const orderItems: AssortmentItem[] = [];
          Array.from(this.cartService.cart.entries())
            .forEach(([id, amount]) => {
              for (let i = 0; i < amount; i++) {
                const item = assortment.items.find(i => i.id === id);
                if (item) {
                  orderItems.push(item);
                }
              }
            })
          return this.apiService.makeOrder({
            order_number: orderNumber,
            order_comment: this.cartService.comment(),
            items: orderItems.map(item => ({
              id: item.id,
              item_type: item.item_type,
              price: item.price,
              name: item.name
            })),
          })
        }),
        take(1),
      )
      .subscribe(() => {
        this.cartService.resetCart();
        this.router.navigateByUrl('/assortment');
        this.snackBar.open('✅ Заказ відправлено', undefined, {
          duration: 3000,
        });
      });
  }
}
