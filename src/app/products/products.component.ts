import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './model/product';
import { ProductService } from './service/product.service';
import { faAdd, faCoffee, faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  isUserAdmin: any;
  validateAdmin: Boolean= false;
  routerLinkS: String = '';
  faEdit = faEdit;
  faAdd = faPlusCircle
  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => this.isUserAdmin = param.get("isAdmin"));
    console.log(this.isUserAdmin)
    this.routerLinkS = '/product-add/' + this.isUserAdmin + '/' + 0;
    if(this.isUserAdmin == 'true') {
      this.validateAdmin = true;
    }
    this.productService.findAllProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  iconClick(idProduct: Number){
    this.routerLinkS = '/product-add/' + this.isUserAdmin + '/' + idProduct;
    this.router.navigate([this.routerLinkS]);
    console.log("cllickeablle  " + this.routerLinkS);
  }

}
