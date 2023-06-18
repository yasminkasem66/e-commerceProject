import { Component, OnInit } from '@angular/core';
import { ShippingModel } from '../@AppService/models/shipping-model';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit {
  shipping!: ShippingModel;

  constructor() {}
  placeOrder() {
    console.log(this.shipping);
  }
  ngOnInit(): void {}
}
