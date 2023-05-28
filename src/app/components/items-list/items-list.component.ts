import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  HostListener,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AssortmentItem } from '../../models/assortment-item';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatInputModule, RouterLink, MatListModule, FormsModule, MatSnackBarModule],
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsListComponent {

  cart: WritableSignal<Map<number, number>>;
  list: Signal<Array<{ item: AssortmentItem; amount: number }> | undefined>;
  comment = this.cartService.comment;
  assortment = toSignal(this.apiService.getAssortment());
  total = computed<number>(() => this.list()?.reduce((sum, i) => sum + i.item.price * i.amount, 0) ?? 0);

  @HostBinding('style.height.px')
  containerHeight: number | null = window.visualViewport?.height ?? null;

  @HostListener('window:resize')
  setContainerHeight(): void {
    this.containerHeight = window.visualViewport?.height ?? null;
  }

  constructor(
    private apiService: ApiService,
    private cartService: CartService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.cart = signal(this.cartService.cart);
    this.list = computed(() => {
      const list: Array<{
        item: AssortmentItem;
        amount: number;
      }> = [];
      Array.from(this.cart().entries()).forEach(([id, amount]) => {
        const item = this.assortment()?.items.find(i => i.id === id);
        if (item) {
          list.push({ item, amount });
        }
      });
      return list;
    })
  }

  setComment(comment: string): void {
    this.cartService.comment.set(comment);
  }

  removeItem(item: AssortmentItem): void {
    this.cart.mutate(() => this.cartService.removeItem(item));
  }

  removeAll(): void {
    if (confirm('Ти серйозно?')) {
      this.cart.mutate(() => this.cartService.resetCart());
      this.router.navigateByUrl('/assortment');
      this.snackBar.open('✅ Заказ скасовано', undefined, {
        duration: 3000,
      });
    }
  }
}
