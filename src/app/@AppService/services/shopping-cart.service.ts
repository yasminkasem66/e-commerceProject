import { Product } from 'src/app/@AppService/models/product';
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { map, take } from 'rxjs/operators';
import { Cart } from '../models/cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  async getCart(): Promise<Observable<Cart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db
      .object('/shopping-carts/' + cartId)
      .valueChanges()
      .pipe(map((x: any) => new Cart(x.items)));
  }

  private getItem(cartId: string, prdId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + prdId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let res = await this.create();
    localStorage.setItem('cartId', res.key!);
    return res.key!;
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFrmCart(product: Product) {
    this.updateItem(product, -1);
  }
  async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key!);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        let quantity = (item?.quantity || 0) + change;
        if (quantity == 0) item$.remove();
        else
          item$.update({
            key: product.key,
            title: product.title,
            imgUrl: product.imgUrl,
            price: product.price,
            category: product.category,
            quantity: quantity,
          });
      });
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }
}
