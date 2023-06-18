import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../@AppService/models/cart';
import { ShoppingCartService } from '../@AppService/services/shopping-cart.service';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.scss'],
})
export class ShopingCartComponent implements OnInit {
  cart$!: Observable<Cart | null>;

  constructor(private shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }

  Clear() {
    this.shoppingCartService.clearCart();
  }
}
