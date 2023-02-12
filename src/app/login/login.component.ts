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

  }


  login() {
    this.auth.login();
  }


}
