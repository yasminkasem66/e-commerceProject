import { Product } from './../../@AppService/models/product';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/@AppService/services/product.service';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  id: string;
  displayedColumns: string[] = ['imgUrl', 'title', 'price', 'category', 'actions'];
  dataSource = new MatTableDataSource<Product>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  products: Product[] = []


  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.getProducts();
  }
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getProducts() {
    this.productService.getProdducts().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe((data) => {
      this.products = data as Product[];
      this.dataSource.data = this.products;
    });
  }

  delete(id: string) {
    if (confirm('sure')) {
      this.productService.deleteProdduct(id)
    }
  }

  filter(search: string) {

    this.dataSource.filter = search.toLowerCase();

    // console.log({ search });
    // this.dataSource.data = (search) ? this.products.filter((prd) => {
    //   return prd.title.toLowerCase().includes(search.toLowerCase())
    // }) : this.products;
  }



}
