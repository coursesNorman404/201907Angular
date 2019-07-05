import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


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
  zumbidoS = new Audio('assets/sound/zumbido.m4a')
  sound = new Audio('assets/sound/new_message.m4a')
  state = 'inicial'
  constructor(
    private activatedRoute: ActivatedRoute,
    ) {
      
      this.friendId = this.activatedRoute.snapshot.params['uid']
  }
  ngOnInit() {
  
  }
}
