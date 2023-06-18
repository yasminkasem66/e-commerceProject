import { Product } from 'src/app/@AppService/models/product';
export class CartItem {
  key!: string;
  title!: string;
  imgUrl!: string;
  price!: number;
  quantity!: number;
  category!: string;

  constructor(init?: Partial<CartItem>) {
    Object.assign(this, init);
  }
  get totalPrice() {
    return this.price * this.quantity;
  }
}
