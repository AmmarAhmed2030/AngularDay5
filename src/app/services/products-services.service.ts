import { Injectable, OnInit } from '@angular/core';
import { IProduct } from '../models/iproduct';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsServices {
  myHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(
      `http://localhost:3000/products`,
      JSON.stringify(product),
      this.myHeaders
    );
  }

  getAllProductsByMyApi(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/products`);
  }
  productToUpdate: any;
  updateClicked: boolean = false;
  updateProduct(productData: any): Observable<any> {
    if (productData.id) {
      // If ID is provided, update the existing product
      const id = productData.id;
      // Remove ID from productData as it's not needed for updating
      delete productData.id;
      return this.http.patch<any>(
        `http://localhost:3000/products/${id}`,
        productData
      );
    } else {
      // If ID is not provided, add a new product
      return this.http.post<any>(`http://localhost:3000/products`, productData);
    }
  }
  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/products/${id}`);
  }
  deleteById(id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/products/${id}`);
  }
}
