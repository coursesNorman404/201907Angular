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
        this.message.next(msg)
    }
}