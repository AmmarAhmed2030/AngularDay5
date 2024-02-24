import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '../../models/store';
import { IProduct } from '../../models/iproduct';
import { ICategory } from '../../models/icategory';
import { DiscountOffers } from '../../models/DiscountOffers';
import { CreditCardFormatPipe } from '../../pipes/credit-card-format.pipe';
import { FormsModule } from '@angular/forms';
import { ProductShadowDirective } from '../../directives/product-shadow.directive';
import { CommonModule } from '@angular/common';
import { ProductsServices } from '../../services/products-services.service';
import { Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  imports: [
    CreditCardFormatPipe,
    FormsModule,
    ProductShadowDirective,
    CommonModule,
    RouterModule,
  ],
})
export class ProductsComponent implements OnInit {
  shadowBorder: object = {
    borderRadius: '10px solid blue',
    borderShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    border: '1px solid blue',
  };
  storeObj: Store = new Store(
    'Ozy',
    ['fayoum', 'cairo'],
    'assets/aad4d0110142211.5fe4b63868daa.jpg'
  );
  clientName: string;
  ProductList: any[] = [];
  filteredProducts: any[] = [];

  changeQuantity(id: number, prd: IProduct) {
    this.addChildrenEvent.emit(prd);
    let foundItem = this.ProductList.find((item) => item.id == id);
    if (foundItem) {
      foundItem.quantity -= 1;
      foundItem.isPurchased = true;
      foundItem.purchaseDate = new Date();
    }
  }
  categories: ICategory[] = [];
  catId: string = '';
  discount: DiscountOffers;
  currQuantity: string = '';
  purchaseDate = Date.now();

  @Input() set rangePrice(value: string) {
    if (value == '') {
      this.filteredProducts = this.ProductList;
    } else if (value == '90') {
      this.filteredProducts = this.ProductList.filter(
        (prd) => prd.price >= Number(value)
      );
    } else if (value) {
      this.filteredProducts = this.ProductList.filter(
        (prd) => prd.price >= Number(value) && prd.price <= Number(value) + 30
      );
    }
  }
  @Output() addChildrenEvent: EventEmitter<IProduct> =
    new EventEmitter<IProduct>();
  set selectedCategory(value: string) {
    if (value === 'All Products') {
      this.filteredProducts = this.ProductList;
    } else {
      this.filteredProducts = this.ProductList.filter(
        (prd) => prd.category == value
      );
    }
  }
  isLoading: boolean = true;
  constructor(
    private prodService: ProductsServices,
    private catService: CategoryService,
    private router: Router
  ) {
    this.clientName = 'Ammar';
    this.discount = DiscountOffers.TenPercent;
  }

  goTo(prdId: string): void {
    if (prdId) {
      this.router.navigate([`/admin/insertProduct`, prdId]);
      this.prodService.updateClicked = true;
    } else {
      this.router.navigate([`/admin/insertProduct`]);
    }
  }
  handleDelete(prdId: string) {
    let check = confirm('Are You sure to delete');
    if (check) {
      this.prodService.deleteById(prdId).subscribe({
        next: (data) => {
          console.log(data);
          this.prodService.getAllProductsByMyApi().subscribe({
            next: (data) => {
              this.ProductList = data;
              this.filteredProducts = this.ProductList;
            },
            complete: () => {
              this.isLoading = false;
            },
          });
        },
      });
    }
  }

  ngOnInit(): void {
    this.catService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
    });
    this.isLoading = true;
    this.prodService.getAllProductsByMyApi().subscribe({
      next: (data) => {
        this.ProductList = data;
        this.filteredProducts = this.ProductList;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
