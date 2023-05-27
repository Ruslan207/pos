import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssortmentComponent } from './components/assortment/assortment.component';

const routes: Routes = [
  {
    path: 'assortment',
    component: AssortmentComponent,
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
