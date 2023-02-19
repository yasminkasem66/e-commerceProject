import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/app/@AppService/models/cart';
import { Product } from 'src/app/@AppService/models/product';
import { ShoppingCartService } from 'src/app/@AppService/services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss'],
})
export class ProductQuantityComponent implements OnInit {
  @Input('Product') prd!: Product;
  @Input('shoping_cart') shoping_cart!: Cart;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    console.log('this.shoping_cart', this.shoping_cart);
  }

  addToCart() {
    this.shoppingCartService.addToCart(this.prd);
  }
  removeFrmCart() {
    this.shoppingCartService.removeFrmCart(this.prd);
  }

  getQuantity() {
    if (!this.prd.key || !this.shoping_cart) return 0;
    let key = this.prd.key as unknown as number;
    let item = this.shoping_cart.itemsMap[key];
    return item ? item.quantity : 0;
  }
}
