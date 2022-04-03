import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { CartItem } from "../common/cart-item";

@Injectable({
    providedIn: 'root'
})

export class CartService {
    cartItems: CartItem[] = [];
    totalPrice: Subject<number> = new Subject<number>();
    totalQuantity: Subject<number> = new Subject<number>();

    addToCart(cartItem: CartItem) {
        let alreadyExistsInCart: boolean = false;
        let existingCartItem: CartItem;

        existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === cartItem.id)!;

        alreadyExistsInCart = (existingCartItem != undefined);

        if (alreadyExistsInCart) {
            existingCartItem.quantity++;
        } else {
            this.cartItems.push(cartItem);
        }

        this.computeCartTotals();
    }

    private computeCartTotals() {
        let totalPriceValue: number = 0;
        let totalQuantityValue: number = 0;

        for (let currentCartItem of this.cartItems) {
            totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
            totalQuantityValue += currentCartItem.quantity;
        }

        this.totalPrice.next(totalPriceValue);
        this.totalQuantity.next(totalQuantityValue);
    }
}