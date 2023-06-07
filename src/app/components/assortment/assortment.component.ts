import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { MatTabsModule } from '@angular/material/tabs';
import { map, Observable } from 'rxjs';
import { AssortmentCategory } from '../../models/assortment-category';
import { AssortmentItem } from '../../models/assortment-item';
import { AssortmentGroup } from '../../models/assortment-group';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-assortment',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatCardModule, MatButtonModule, MatIconModule, MatBadgeModule, RouterLink],
  templateUrl: './assortment.component.html',
  styleUrls: ['./assortment.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssortmentComponent {

  readonly tabs = [
    { tab: 'Напої', value: AssortmentCategory.Drinks, },
    { tab: 'Кава', value: AssortmentCategory.Coffee, },
    { tab: 'Їжа', value: AssortmentCategory.Food, },
  ];
  readonly  groupNames: Record<AssortmentGroup, string> & {'': string} = {
    [AssortmentGroup.Classic]: 'Класика',
    [AssortmentGroup.WithoutMilk]: 'Без молока',
    [AssortmentGroup.CoconutMilk]: 'На кокосовому',
    [AssortmentGroup.AlmondMilk]: 'На мигдальному',
    [AssortmentGroup.Lemonade]: 'Лимонад',
    [AssortmentGroup.Tea]: 'Чай',
    [AssortmentGroup.Sweet]: 'Солодке',
    [AssortmentGroup.Salty]: 'Солоне',
    '': '',
  };
  selectedTab = signal(1);
  readonly AssortmentItemType = AssortmentCategory;
  readonly AssortmentGroup = AssortmentGroup;
  menu$: Record<AssortmentCategory, Observable<Array<{
    group: AssortmentGroup | '';
    items: AssortmentItem[];
  }>>>;
  cart: WritableSignal<Map<number, number>>;

  constructor(
    private apiService: ApiService,
    private cartService: CartService,
  ) {
    this.menu$ = {
      [AssortmentCategory.Food]: this.groupAssortmentByItemType(AssortmentCategory.Food, this.apiService.getAssortment()),
      [AssortmentCategory.Coffee]: this.groupAssortmentByItemType(AssortmentCategory.Coffee, this.apiService.getAssortment()),
      [AssortmentCategory.Drinks]: this.groupAssortmentByItemType(AssortmentCategory.Drinks, this.apiService.getAssortment()),
    };
    this.cart = signal(this.cartService.cart);
  }

  private groupAssortmentByItemType(
    category: AssortmentCategory,
    assortment$: Observable<{items: AssortmentItem[]}>,
  ): Observable<Array<{
    group: AssortmentGroup | '';
    items: AssortmentItem[];
  }>> {
    return assortment$.pipe(
      map(assortment => assortment.items.filter(i => i.category === category)),
      map(assortmentItems => assortmentItems.reduce((acc, assortmentItem) => {
        const group = assortmentItem.group ?? '';
        if (!acc.has(group)) {
          acc.set(group, []);
        }
        acc.get(group)?.push(assortmentItem)
        return acc;
      }, new Map<AssortmentGroup | '', AssortmentItem[]>())),
      map(assortmentItemMap => Array.from(assortmentItemMap.entries()).map(([group, assortmentItems]) => ({
        group,
        items: assortmentItems.sort((a, b) => a.group_order - b.group_order),
      }))),
    );
  }

  addItemToCart(item: AssortmentItem): void {
    this.cart.mutate(() => this.cartService.addItemToCart(item));
  }
}
