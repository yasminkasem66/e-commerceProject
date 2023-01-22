import { User } from './../../@AppService/models/user';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/@AppService/services/auth.service';
import { UserService } from 'src/app/@AppService/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminauthGuard implements CanActivate {

  constructor(public auth: AuthService, private router: Router, private userService: UserService) {

  }

  canActivate(): Observable<boolean> {
    return this.auth.appUser
      .pipe(map((user: any) => {
        return user.isAdmin
      }));
    // return this.auth.user$.pipe(
    //   switchMap((data: any) => this.userService.getUser(data.uid)))
    //   .pipe(map(user => {
    //     console.log({ user });
    //     console.log("user[0].isAdmin", user[0].isAdmin);

    //     return user[0].isAdmin
    //   }));
  }




}
