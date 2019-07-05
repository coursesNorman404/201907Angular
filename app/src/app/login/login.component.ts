import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  operecion: string = 'login'
  user: any = {}
  constructor(
    private userService: UserService,
    private _cookie: CookieService,
    private router: Router
    ) {
      let token = this._cookie.get('token')
    if (token) {
      this.router.navigateByUrl('/home')
    }
    }

  ngOnInit() {
  }
  register() {
    this.userService.register(this.user).subscribe(res => {
      this.user = {}
      this.operecion ='login'
    })
  }
  login(){
    this.userService.login(this.user).subscribe(res => {
      this.user = res
      this._cookie.put('token', this.user.token)
      this._cookie.put('UserId', this.user.UserId)
      this.router.navigateByUrl('/home')
    })
  }

}
