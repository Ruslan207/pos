import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AssortmentItem } from '../../models/assortment-item';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { map, Observable } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatInputModule, RouterLink, MatListModule, FormsModule],
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsListComponent {

  list$: Observable<AssortmentItem[]>;
  total$: Observable<number>;
  constructor(
    private apiService: ApiService,
    private cartService: CartService,
  ) {
    this.list$ = this.apiService.getAssortment()
      .pipe(
        map(assortment => {
          const list: AssortmentItem[] = [];
          Array.from(this.cartService.cart.entries())
            .forEach(([id, amount]) => {
              for (let i = 0; i < amount; i++) {
                const item = assortment.items.find(i => i.id === id);
                if (item) {
                  list.push(item);
                }
              }
            });
          return list;
        })
      )
    this.total$ = this.list$.pipe(map(list => list.reduce((sum, i) => sum + i.price, 0)))
  }

  setComment(comment: string): void {
    this.cartService.comment.set(comment);
  }
}
