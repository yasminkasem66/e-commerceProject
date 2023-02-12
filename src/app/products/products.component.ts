import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
// import { Subscription } from 'rxjs-compat';
import { map, switchMap } from 'rxjs/operators';
import { Cart } from '../@AppService/models/cart';
import { Category } from '../@AppService/models/category';
import { Product } from '../@AppService/models/product';
import { CategoryService } from '../@AppService/services/category.service';
import { ProductService } from '../@AppService/services/product.service';
import { ShoppingCartService } from '../@AppService/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {




  products: Product[] = [];
  filteredProducts!: Product[];
  selctedCategory: string = '';
  cart!: Cart;
  subscription!: Subscription;

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private shoppingCartService: ShoppingCartService,
    private activatedRoute: ActivatedRoute) {
    this.getProducts();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).subscribe((cart) => {
      console.log({ cart });
      this.cart = cart!
    })
  }

  getProducts() {
    this.productService.getProdducts().snapshotChanges().pipe(

      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))),
      switchMap((data) => {
        this.filteredProducts = this.products = data as Product[];
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
