import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/@AppService/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input('Product') prd!: Product;
  @Input('show_actions') show_actions: boolean = true;
  defaultImg: string = 'https://img.freepik.com/free-photo/assortment-bread-loaves-wood_23-2147761305.jpg?w=740&t=st=1675005083~exp=1675005683~hmac=1a3752887575eb1d935ff96e235408b8a8ef5b124c315043468c33d05ee1a9fe'
  constructor() { }

  ngOnInit(): void {
  }

}
