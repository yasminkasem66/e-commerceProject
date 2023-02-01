import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/app/@AppService/models/category';
import { CategoryService } from 'src/app/@AppService/services/category.service';
import { ProductService } from 'src/app/@AppService/services/product.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  categories$!: Observable<Category[]>
  @Input('selctedCategory') selctedCategory!: string;

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute) {
    this.categories$ = this.categoryService.getCategories().valueChanges();

  }

  ngOnInit(): void {
  }

}
