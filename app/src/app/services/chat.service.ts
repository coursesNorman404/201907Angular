import { Injectable } from '@angular/core'
import { WebsocketService } from './websocket.service'
import { Subject } from 'rxjs'

@Injectable()

export class ChatService {
    message: Subject<any>
    constructor(private wsService: WebsocketService) {
        this.message = <Subject<any>>wsService.connect().map(
            (responser: any):any => {
                return responser
            }
        )
    }
    sendMsg(msg) {
        this.message.next({accion: "message", message: msg})
    }
    addChat(uid) {
        this.message.next({accion: "add", message: uid})
    }
    zumbido(friendId) {
        this.message.next({accion: 'zumbido', message: friendId})
    }
}