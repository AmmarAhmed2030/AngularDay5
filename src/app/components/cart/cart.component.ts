import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  totalPrice: any;
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cart = this.cartService.getAllCartItems();
    console.log(this.cart);
    this.totalPrice = this.cartService.calculateTotalPriceOfCart();
  }
}
