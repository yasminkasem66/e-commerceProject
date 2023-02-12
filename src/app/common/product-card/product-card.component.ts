import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/app/@AppService/models/cart';
import { CartItem } from 'src/app/@AppService/models/cart-item';
import { Product } from 'src/app/@AppService/models/product';
import { ShoppingCartService } from 'src/app/@AppService/services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input('Product') prd!: Product;
  @Input('show_actions') show_actions: boolean = true;
  @Input('shoping_cart') shoping_cart!: Cart;
  defaultImg: string = 'https://img.freepik.com/free-photo/assortment-bread-loaves-wood_23-2147761305.jpg?w=740&t=st=1675005083~exp=1675005683~hmac=1a3752887575eb1d935ff96e235408b8a8ef5b124c315043468c33d05ee1a9fe'
  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {

    console.log("this.shoping_cart", this.shoping_cart);

  }


  addToCart() {
    this.shoppingCartService.addToCart(this.prd);
  }
  removeFrmCart() {
    this.shoppingCartService.removeFrmCart(this.prd);
  }

  getQuantity() {

    if (!this.prd.key || !this.shoping_cart) return 0
    let key = this.prd.key as unknown as number;
    let item = this.shoping_cart.items[key]
    return item ? item.quantity : 0
  }

}
