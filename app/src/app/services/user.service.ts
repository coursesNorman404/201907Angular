import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http'
import { CookieService } from 'ngx-cookie';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL:string = 'http://localhost:8989/api'
  TOKEN: string
  USERID: string

  constructor(public http: HttpClient, private _cookie:CookieService) {
    this.setInfo()
  }
  setInfo(){
    this.USERID = this._cookie.get('UserId')
    this.TOKEN = this._cookie.get('token')
  }
  getUserInfo () {
    return this.http.get(`${this.URL}/users/${this.USERID}`)
  }
  getFriends() {
    return this.http.get(`${this.URL}/users/${this.USERID}/friend`)
  }
  register(user) {
    return this.http.post(`${this.URL}/users`, user)
  }
  login(user) {
    return this.http.post(`${this.URL}/users/login`, user)
  }
  addFriend(email) {
    return this.http.post(`${this.URL}/friend/new/${this.USERID}`, {email})
  }
  getFriendsPending() {
    return this.http.get(`${this.URL}/users/${this.USERID}/friend/pending`)
  }
  accept(uid) {
    return this.http.post(`${this.URL}/friend/accept/${uid}`, {})
  }
  update(user) {
    return this.http.patch(`${this.URL}/users/${this.USERID}`, user)
  }
  getChat(uid) {
    return this.http.get(`${this.URL}/chat/${uid}`)
  }
}
