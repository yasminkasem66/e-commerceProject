import { CartItem } from "./cart-item";

export class Cart {

    items: CartItem[] = [];
    constructor(public itemsMap: { [productId: string]: CartItem }) {
        for (let prd in itemsMap) {
            let item = itemsMap[prd];
            this.items.push(new CartItem(item.product, item.quantity))
        }
    }

    get productIds(): number[] {
        return Object.keys(this.itemsMap) as unknown as number[]
    }

    get totalCartCount() {
        let cartItemsCount = 0;
        for (let prdId in this.itemsMap)
            cartItemsCount += this.itemsMap[prdId].quantity

        return cartItemsCount
    }

    get totalPriceCart() {
        let sum = 0;
        for (let prdId in this.itemsMap)
            sum += this.itemsMap[prdId].totalPrice

        return sum
    }
}
