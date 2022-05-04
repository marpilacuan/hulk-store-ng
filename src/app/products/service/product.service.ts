import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { ProductRecord } from '../model/product-record';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080/api/";
  constructor(private http: HttpClient) { }

  findAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}product/findAllProducts`);
  }

  findProductById(idProduct: Number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}product/findById/${idProduct}`);
  }

  saveNewProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}product/createOrUpdateProduct`, product);
  }

  findRecordProduct(idProduct: Number): Observable<ProductRecord[]> {
    return this.http.get<ProductRecord[]>(`${this.baseUrl}productRecord/findRecordByIdProduct/${idProduct}`);
  }
}
