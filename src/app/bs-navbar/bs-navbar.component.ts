import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { user } from 'rxfire/auth';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Cart } from '../@AppService/models/cart';
import { User } from '../@AppService/models/user';
import { AuthService } from '../@AppService/services/auth.service';
import { ShoppingCartService } from '../@AppService/services/shopping-cart.service';
import { UserService } from '../@AppService/services/user.service';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit {

  user!: User;
  subscription!: Subscription;
  // cartItemsCount: number = 0;
  cart$!: Observable<Cart | null>;

  constructor(public auth: AuthService,
    private userService: UserService,
    private shoppingCartService: ShoppingCartService,
  ) {

  }

  async ngOnInit() {
    this.auth.appUser
      .subscribe((user: any) => this.user = user);

    this.cart$ = (await this.shoppingCartService.getCart())
    // .subscribe((cart) => {
    //   console.log({ cart });
    //   this.cartItemsCount = 0;
    //   if (!cart) return
    //   for (let prdId in cart.items) {
    //     this.cartItemsCount += cart.items[prdId].quantity
    //   }
    // Object.values(cart.items)?.filter((item: any) => {
    //   this.cartItemsCount += item?.quantity
    // })
    //   console.log(this.cartItemsCount);
    // })
  }

  logout() {
    this.auth.logout();
  }

}
