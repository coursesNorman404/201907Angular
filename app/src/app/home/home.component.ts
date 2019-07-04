import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  friends: User[]
  query = ''
  constructor(
    private userService: UserService,
    private _cookie: CookieService,
    private router: Router
    ) {
    let token = this._cookie.get('token')
    if (!token) {
      this.router.navigateByUrl('/login')
    }
    this.friends = this.userService.getFriends()
 }

  ngOnInit() {
  }

}
