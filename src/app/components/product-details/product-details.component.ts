import { Component, OnInit } from '@angular/core';
import { ProductsServices } from '../../services/products-services.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  singleProduct: any;
  constructor(
    private prodService: ProductsServices,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  goBack(): void {
    this.router.navigate(['/products']);
  }

  ngOnInit(): void {
    let prdId = String(this.route.snapshot.paramMap.get('id'));
    this.prodService.getProductById(prdId).subscribe({
      next: (data) => {
        this.singleProduct = data;
        console.log(prdId);
      },
    });
  }
}
