import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../products/model/product';
import { ProductRecord } from '../products/model/product-record';
import { ProductService } from '../products/service/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  categories: string[] = ["Marvel", "DC Comics", "Alternative"];
  form: FormGroup;
  submitted = false;
  alert: Boolean = false;
  productRequest: Product = new Product;
  isUserAdmin: any;
  idProduct: any;
  allProducts: Product[] = [];
  message: String = ' created';
  productRecordCol: ProductRecord[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router, private productService: ProductService, private route: ActivatedRoute) {
    this.form = this.formBuilder.group({
      productName: ['', Validators.required],
      categorySelected: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => this.isUserAdmin = param.get("isAdmin"));
    this.route.paramMap.subscribe(param => this.idProduct = param.get("id"));
    if(this.idProduct != '0') {
      this.productService.findProductById(this.idProduct).subscribe(data => {
        this.form = this.formBuilder.group({
          productName: [data.name, Validators.required],
          categorySelected: [data.category, Validators.required],
          price: [data.price, Validators.required],
          stock: [data.stock, Validators.required]
        });
      });
      this.productService.findRecordProduct(this.idProduct).subscribe(data => {
        this.productRecordCol = data;
      });
    }
  }
  onSubmit() {
    console.log(this.form.value['categorySelected'])
    if (this.form.value['productName'] == ''
      || this.form.value['categorySelected'] == ''
      || this.form.value['price'] == ''
      || this.form.value['stock'] == '') {
      this.submitted = true;

    } else {
      this.submitted = false;
      if(this.idProduct != '0') {
        this.productRequest.id = this.idProduct
        this.message = 'updated';
      }
      this.productRequest.name = this.form.value['productName'];
      this.productRequest.category = this.form.value['categorySelected'];
      this.productRequest.price = this.form.value['price'];
      this.productRequest.stock = this.form.value['stock']
      this.productService.saveNewProduct(this.productRequest).subscribe(product => {
        this.alert = true;
        this.form.reset();
        setTimeout(() => {
          this.onTimeOut();
        }, 1500);
      });
    }
  }

  onTimeOut() {
    this.router.navigate(["products/" + this.isUserAdmin]);
  }

  closeAlert() {
    this.alert = false;
  }

}
