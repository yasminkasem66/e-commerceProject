import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { user } from 'rxfire/auth';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../@AppService/models/user';
import { AuthService } from '../@AppService/services/auth.service';
import { UserService } from '../@AppService/services/user.service';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit {

  user!: User;
  constructor(public auth: AuthService,
    private userService: UserService
  ) {
    auth.appUser
      .subscribe((user: any) => this.user = user);
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
  }


}
