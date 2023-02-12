import { Product } from 'src/app/@AppService/models/product';
export class CartItem {

        constructor(public product: Product, public quantity: number) {

        }
        get totalPrice() {
                console.log("this.product.price * this.quantity", this.product.price * this.quantity);

                return this.product.price * this.quantity;
        }
}
