import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  friends: User[] = [
    {nick: 'Paola', subNick: 'Mi mensaje personal', status: 'online', age: 28, email: 'p@norman.com', friend: true, uid: 1},
    {nick: 'Antonio', subNick: 'Mi mensaje personal', status: 'busy', age: 25, email: 'a@norman.com', friend: true, uid: 2},
    {nick: 'Norman', subNick: 'Mi mensaje personal', status: 'away', age: 28, email: 'n@norman.com', friend: false, uid: 3}
  ]
  constructor() { }
  getFriends() {
    return this.friends
  }
}
