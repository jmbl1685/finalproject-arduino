import { Component, OnInit } from '@angular/core';
import { AppService } from './app.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public lightArray: any;
  public detectedMovementCount: Number = 0;

  constructor(private appService: AppService) {
    this.GetLight();
  }

  public ngOnInit() {
    this.appService.SensorMovement().subscribe(data => this.detectedMovementCount = data)
    this.appService.getMessage().subscribe(data => this.GetLight())
  }

  public Click(id: string, room: string, state: boolean) {
    this.appService.sendMessage(id, room,!state).subscribe(
      res => {
        this.GetLight()
      }, err => {
        console.log(err)
      });
  }

  public GetLight() {
    this.appService.GetLight().subscribe(res => {
      this.lightArray = res
    }, err => {
      console.log(err)
    })
  }

}
