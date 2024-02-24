import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: any = [];
  constructor() {}
  getAllCartItems() {
    return this.cart;
  }
  addProductToCart(prd: any) {
    let foundItem = this.cart.find((elem: any) => {
      return elem.id == prd.id;
    });
    if (foundItem) {
      foundItem.requiredQuantity++;
    } else {
      this.cart.push({ ...prd, requiredQuantity: 1 });
    }
  }
  calculateTotalPriceOfCart(): number {
    let totalPrice: number = 0;
    this.cart.forEach((item: any) => {
      totalPrice += item.price * item.requiredQuantity;
    });
    return totalPrice;
  }
}
