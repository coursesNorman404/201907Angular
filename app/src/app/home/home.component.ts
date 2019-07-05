import { Component, OnInit, Query } from '@angular/core';
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
  friends: any = []
  myUser: any = {}
  query: string = ''
  newFriend = false
  friendEmail: string = ''
  friendsPending: any = {}
  constructor(
    private userServices: UserService,
    private _cookie: CookieService,
    private router: Router
    ) {
    let token = this._cookie.get('token')
    if (!token) {
      this.router.navigateByUrl('/login')
    }else {
      this.userServices.setInfo()
      this.userServices.getUserInfo().subscribe(user => {
        this.myUser = user
      })
      this.userServices.getFriends().subscribe(friends => {
        this.friends = friends
        console.log(this.friends)
      })
      this.userServices.getFriendsPending().subscribe(friends => {
        this.friendsPending = friends
      })
    }
  }
  addFriend() {
    this.userServices.addFriend(this.friendEmail).subscribe(send => {
      this.newFriend = false
      this.friendEmail = ''
      alert('Amigo Agregado')
    })
  }
  accept(uid) {
    this.userServices.accept(uid).subscribe(res => {
      this.userServices.getFriends().subscribe(friends => {
        this.friends = friends
      })
      this.userServices.getFriendsPending().subscribe(friends => {
        this.friendsPending = friends
      })
    })
  }
  ngOnInit() {
  }

}
