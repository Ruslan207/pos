import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { MatTabsModule } from '@angular/material/tabs';
import { map, Observable } from 'rxjs';
import { AssortmentItemType } from '../../models/assortment-item-type';
import { AssortmentItem } from '../../models/assortment-item';
import { AssortmentGroup } from '../../models/assortment-group';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-assortment',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatCardModule, MatButtonModule, MatIconModule, MatBadgeModule],
  templateUrl: './assortment.component.html',
  styleUrls: ['./assortment.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssortmentComponent {

  readonly tabs = [
    { tab: 'Чай', value: AssortmentItemType.Tea, },
    { tab: 'Кава', value: AssortmentItemType.Coffee, },
    { tab: 'Десерти', value: AssortmentItemType.Dessert, },
  ];
  readonly  groupNames = {
    [AssortmentGroup.LactoseFree]: 'Безлактозне',
    [AssortmentGroup.Double]: 'Double',
    [AssortmentGroup.DoubleLactoseFree]: 'Double Безлактозне',
    '': '',
  };
  selectedTab = signal(1);
  readonly AssortmentItemType = AssortmentItemType;
  readonly AssortmentGroup = AssortmentGroup;
  menu$: Record<AssortmentItemType, Observable<Array<{
    group: AssortmentGroup | '';
    items: AssortmentItem[];
  }>>>;
  readonly cart = new Map<AssortmentItem, number>();

  constructor(private apiService: ApiService) {
    this.menu$ = {
      [AssortmentItemType.Tea]: this.groupAssortmentByItemType(AssortmentItemType.Tea, this.apiService.getAssortment()),
      [AssortmentItemType.Coffee]: this.groupAssortmentByItemType(AssortmentItemType.Coffee, this.apiService.getAssortment()),
      [AssortmentItemType.Dessert]: this.groupAssortmentByItemType(AssortmentItemType.Dessert, this.apiService.getAssortment()),
    }
  }

  private groupAssortmentByItemType(
    itemType: AssortmentItemType,
    assortment$: Observable<{items: AssortmentItem[]}>,
  ): Observable<Array<{
    group: AssortmentGroup | '';
    items: AssortmentItem[];
  }>> {
    return assortment$.pipe(
      map(assortment => assortment.items.filter(i => i.item_type === itemType)),
      map(teas => teas.reduce((acc, tea) => {
        const group = tea.group ?? '';
        if (!acc.has(group)) {
          acc.set(group, []);
        }
        acc.get(group)?.push(tea)
        return acc;
      }, new Map<AssortmentGroup | '', AssortmentItem[]>())),
      map(teaMap => Array.from(teaMap.entries()).map(([group, teas]) => ({
        group,
        items: teas.sort((a, b) => a.sort_order - b.sort_order),
      }))),
    );
  }

  addItemToCart(item: AssortmentItem): void {
    if (!this.cart.has(item)) {
      this.cart.set(item, 0);
    }
    const num = this.cart.get(item) ?? 0;
    this.cart.set(item, num + 1);
  }
}
