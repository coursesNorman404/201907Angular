import { Injectable } from '@angular/core'
import * as io from 'socket.io-client'
import * as Rx from 'rxjs/Rx'
import { Observable } from 'rxjs'

@Injectable()

export class WebsocketService {
  private socket
  data: any = {}

  constructor() {}

  connect(): Rx.Subject<MessageEvent> {
    this.socket = io("http://localhost:8989")
    let observable = new Observable(observer => {
      this.socket.on("message", data => {
        observer.next(data)
      })
      return () => {
        this.socket.disconnect()
      }
    })
    let observer = {
      next: (data: Object) => {
        this.data = data
        if (this.data.accion === 'message') {
          this.socket.emit("message", JSON.stringify(this.data.message))
        }
        if (this.data.accion === 'add') {
          this.socket.emit("addUser", JSON.stringify(this.data.message))
        }
        if (this.data.accion === 'zumbido') {
          this.socket.emit("zumbido", JSON.stringify(this.data.message))
        }
      }
    }
    return Rx.Subject.create(observer, observable)
  }
} 
