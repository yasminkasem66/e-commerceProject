import { CartItem } from './cart-item';
import { Product } from './product';

export class Cart {
  items: CartItem[] = [];
  constructor(public itemsMap: { [productId: string]: CartItem }) {
    this.itemsMap = itemsMap || {};
    for (let prd in itemsMap) {
      let item = itemsMap[prd];
      // let x = new CartItem();
      // x.key = prd;
      // Object.assign(x, item);
      this.items.push(new CartItem({ ...item, key: prd }));
    }
  }

  get productIds(): number[] {
    return Object.keys(this.itemsMap) as unknown as number[];
  }

  get totalItemsCount() {
    let cartItemsCount = 0;
    for (let prdId in this.itemsMap)
      cartItemsCount += this.itemsMap[prdId].quantity;

    return cartItemsCount;
  }

  get totalPriceCart() {
    let sum = 0;
    for (let prdId in this.items) sum += this.items[prdId].totalPrice;

    return sum;
  }

  getQuantity(product: Product) {
    //  let key = this.prd.key as unknown as number;
    if (!product.key) return 0;
    let item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }
}
