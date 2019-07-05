import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private _cookie:CookieService, private router: Router) { }

  ngOnInit() {
  }
  exit(){
    this._cookie.removeAll()
    this.router.navigateByUrl('/login')
  }

}
