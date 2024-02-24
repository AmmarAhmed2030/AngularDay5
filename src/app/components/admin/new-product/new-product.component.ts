import { Component, OnInit } from '@angular/core';
import { ProductsServices } from '../../../services/products-services.service';
import { IProduct } from '../../../models/iproduct';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { ICategory } from '../../../models/icategory';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, RouterLink],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss',
})
export class NewProductComponent implements OnInit {
  product: IProduct = {} as IProduct;
  categories: ICategory[] = [];

  constructor(
    private prdService: ProductsServices,
    private catService: CategoryService,
    private router: Router,

    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let prdId = String(this.route.snapshot.paramMap.get('id'));

    this.prdService.getProductById(prdId).subscribe({
      next: (data) => {
        this.product = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.catService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
  updateProduct() {
    this.prdService.updateProduct(this.product).subscribe({
      next: (data) => {
        console.log(data);
      },
      complete: () => {
        alert('Product Updated Successfully');
        this.prdService.updateClicked = false;
        this.goBack();
      },
    });
  }
  addProduct() {
    this.prdService.addProduct(this.product).subscribe({
      next: (data) => {
        console.log(data);
      },
      complete: () => {
        alert('Product Added Successfully');
        this.goBack();
      },
    });
  }
  handleSubmit() {
    if (this.prdService.updateClicked) {
      this.updateProduct();
    } else {
      this.addProduct();
    }
  }
}
