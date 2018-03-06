import { UserService } from '../../core/service/user.service';
import { HomeService } from './../service/home.service';
import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {
  private userName: string;
  constructor(userService: UserService, homeService: HomeService) {
    this.userName = homeService.userName;
  }

  public ngOnInit() {
    console.log('esto es una prueba');
    $(() => {
    console.log('JQuery ready!');
    });
  }
}
