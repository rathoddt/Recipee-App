import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  userSub:Subscription
  constructor(private authService:AuthService){}
  ngOnInit(){
    this.authService.autoLogin()
  }
/*
Project Console: https://console.firebase.google.com/project/recipe-app-11/overview
Hosting URL: https://recipe-app-11.web.app
*/
}
