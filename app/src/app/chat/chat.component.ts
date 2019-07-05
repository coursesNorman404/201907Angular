import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  friendId: any
  message: any = {}
  chat: any = []
  myUser: any = {}
  state = 'inicial'
  constructor(
    private activatedRoute: ActivatedRoute,
    private wschat: ChatService
    ) {
      this.friendId = this.activatedRoute.snapshot.params['uid']
  }
  ngOnInit() {
    this.wschat.message.subscribe(msg => {
      console.log(msg)
    })
  }
  sendMessage() {
  }
}
