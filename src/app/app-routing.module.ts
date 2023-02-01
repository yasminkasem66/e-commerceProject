import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminauthGuard } from './@core/auth/adminauth.guard';
import { AuthGuard } from './@core/auth/auth.guard';
import { AddProductComponent } from './admin/add-product/add-product.component';
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
  // { path: '', redirectTo: '/Home', pathMatch: 'full' }, //Default path ' ';
  { path: '', component: ProductsComponent },
  { path: 'product', component: ProductsComponent },
  { path: 'shoping-cart', component: ShopingCartComponent },
  { path: 'login', component: LoginComponent },

  { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
  { path: 'myorders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuard] },

  { path: 'admin/products/new', component: AddProductComponent, canActivate: [AuthGuard, AdminauthGuard] },
  { path: 'admin/products/:id', component: AddProductComponent, canActivate: [AuthGuard, AdminauthGuard] },
  { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminauthGuard] },
  { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminauthGuard] },
  // { path: '**', component: NotFoundPageComponent }, //wild cart if u check the whole path and u didnt find the route use this one
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
