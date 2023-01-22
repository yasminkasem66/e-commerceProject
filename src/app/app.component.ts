import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './@AppService/services/auth.service';
import { UserService } from './@AppService/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  x = 10
  title = 'ecommerceWithMosh';

  constructor(private auth: AuthService, private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) {
    auth.user$.subscribe((user) => {
      if (user) {
        userService.save(user)
      }
    })
  }
  ngOnInit(): void {

  }


  ngAfterViewInit(): void {
  }



}
