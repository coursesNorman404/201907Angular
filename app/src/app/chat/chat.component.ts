import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  friends: User[]
    friendId: any
    friend: User
    price = 78.12345251
    today:any = Date.now()
  constructor(public activatedRoute: ActivatedRoute, private userService: UserService) {
    this.friendId = this.activatedRoute.snapshot.params['uid']
    this.friends = this.userService.getFriends()
    this.friend = this.friends.find((record) => {
      return record.uid == this.friendId
    })
    console.log(this.friend)

  }

  ngOnInit() {
  }

}
