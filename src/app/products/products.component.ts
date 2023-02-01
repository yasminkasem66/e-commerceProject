import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Category } from '../@AppService/models/category';
import { Product } from '../@AppService/models/product';
import { CategoryService } from '../@AppService/services/category.service';
import { ProductService } from '../@AppService/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {




  products: Product[] = [];
  filteredProducts!: Product[];
  selctedCategory: string = '';

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute) {
    // this.products$ = this.productService.getProdducts().valueChanges();
    this.getProducts();


  }


  ngOnInit(): void {
  }

  getProducts() {
    this.productService.getProdducts().snapshotChanges().pipe(

      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))),
      switchMap((data) => {
        this.filteredProducts = this.products = data;
        return this.activatedRoute.queryParamMap;
      })
    ).subscribe((param) => {
      this.selctedCategory = param.get('category')!
      console.log(" this.selctedCategory", this.selctedCategory);

      this.filteredProducts = this.selctedCategory ? this.products.filter((prd) => {
        return prd.category == this.selctedCategory
      }) : this.products;
    });
  }


}
