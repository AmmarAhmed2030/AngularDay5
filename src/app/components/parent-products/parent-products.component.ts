import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from '../products/products.component';
import { IProduct } from '../../models/iproduct';
import { ICart } from '../../models/icart';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-parent-products',
  standalone: true,
  imports: [FormsModule, ProductsComponent],
  templateUrl: './parent-products.component.html',
  styleUrl: './parent-products.component.scss',
})
export class ParentProductsComponent {
  selectedRange: string = '';
  // cart: any[] = [];
  constructor(private cartService: CartService) {}
  addToCart(receivedProduct: IProduct) {
    this.cartService.addProductToCart(receivedProduct);
  }
}
