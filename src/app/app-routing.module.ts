import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductsComponent } from './products/products.component';
import { ShopingCartComponent } from './shoping-cart/shoping-cart.component';

const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' }, //Default path ' ';
  { path: 'Home', component: HomeComponent },
  { path: 'product', component: ProductsComponent },
  { path: 'shoping-cart', component: ShopingCartComponent },
  { path: 'check-out', component: CheckOutComponent },
  { path: 'myorders', component: MyOrdersComponent },
  { path: 'order-success', component: OrderSuccessComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/product', component: AdminProductsComponent },
  { path: 'admin/orders', component: AdminOrdersComponent },
  // { path: '**', component: NotFoundPageComponent }, //wild cart if u check the whole path and u didnt find the route use this one
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
