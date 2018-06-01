import { Injectable } from '@angular/core'
import { Socket } from 'ng-socket-io';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observer } from 'rxjs/Observer';
import { Config } from '../app/config'

@Injectable()
export class AppService {

  public url: string = Config.url + "/api";

  constructor(private http: HttpClient, private socket: Socket) { }

  public sendMessage(id: string, room: string, state: boolean) {

    const dataForm = {
      _id: id,
      room: room,
      state: state
    }

    this.socket.emit("light", dataForm);
    return this.UpdateStateLigth(dataForm)
  }

  public getMessage() {
    return this.socket
      .fromEvent<any>("light")
  }

  public SensorMovement() {
    return this.socket
      .fromEvent<any>("sensor")
  }

  public UpdateStateLigth(dataForm) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${this.url}/light`, dataForm, { headers: headers });
  }

  public GetLight() {
    return this.http.get(`${this.url}/light`)
  }

}