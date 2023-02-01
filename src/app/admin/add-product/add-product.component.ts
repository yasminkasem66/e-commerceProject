import { Category } from './../../@AppService/models/category';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/@AppService/services/category.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/@AppService/models/product';
import { ProductService } from 'src/app/@AppService/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  categories$: Observable<Category[]>;
  id!: string;
  action: string = ''
  product: Product = {} as Product;

  constructor(private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
    , private activatedRoute: ActivatedRoute) {
    this.categories$ = categoryService.getCategories().valueChanges();
    this.id = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    if (this.id) {
      this.action = 'Update'
      this.getProduct(this.id);
    } else {
      this.action = 'Add'
    }
  }

  ngOnInit(): void {
  }

  getProduct(id: string) {
    this.productService.getProdduct(id).valueChanges().pipe(
      take(1)
    ).subscribe((data) => {
      console.log({ data });
      this.product = data as Product;
    });
  }

  save(product: Product) {
    if (this.id) this.productService.updateProdduct(this.id, product)
    else this.productService.create(product)

    this.router.navigate(['/admin/products'])
  }

}
