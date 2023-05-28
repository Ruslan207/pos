import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssortmentComponent } from './components/assortment/assortment.component';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { OrderNumberComponent } from './components/order-number/order-number.component';

const routes: Routes = [
  {
    path: 'assortment',
    component: AssortmentComponent,
  },
  {
    path: 'order',
    component: ItemsListComponent,
  },
  {
    path: 'order-number',
    component: OrderNumberComponent,
  },
  {
    path: '',
    redirectTo: 'assortment',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
