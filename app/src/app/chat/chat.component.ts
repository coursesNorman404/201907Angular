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
  sound = new Audio('assets/sound/new_message.m4a')
  constructor(
    private activatedRoute: ActivatedRoute,
    private wschat: ChatService
    ) {
      this.friendId = this.activatedRoute.snapshot.params['uid']
      this.addChat(this.friendId)
  }
  ngOnInit() {
    this.wschat.message.subscribe(msg => {
      console.log(msg)
      if (msg === 'zumbido') {
        console.log('Si entro')
      }else {
        this.sound.play()
        this.chat.push(msg)
      }
    })
  }
  sendMessage() {
    let message = {message: this.message.text, friendId: this.friendId}
    this.chat.push(message)
    this.wschat.sendMsg(message)
    this.message = {}
  }
  addChat (uid) {
    this.wschat.addChat(uid)
  }
  zumbido() {
    this.wschat.zumbido(this.friendId)
  }
}
