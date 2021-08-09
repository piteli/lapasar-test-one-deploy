import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from 'src/pages/products/products.component';
import { CartComponent } from 'src/pages/cart/cart.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  {
    path: '**',
    redirectTo: 'products',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
