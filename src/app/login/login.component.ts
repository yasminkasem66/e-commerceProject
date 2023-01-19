import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../@AppService/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  redUrl!: string

  constructor(private auth: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe((data) => {
      // this.redUrl = data.get('redUrl') ?data.get('redUrl') :''

    })
  }


  login() {
    this.auth.login();
  }


}
