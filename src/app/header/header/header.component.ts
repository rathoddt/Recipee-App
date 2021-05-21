import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub:Subscription
  isAuthenticated=false
  constructor(private dataStoreService:DataStorageService,
              private authService:AuthService) { }

  ngOnInit(): void {
    this.userSub= this.authService.user.subscribe(user=>{
      //this.isAuthenticated=!user ? false : true
      this.isAuthenticated=!!user //equivalent to above ternary operator
      console.log('!user: ',!user)
      console.log('!!user: ',!!user)
    })
  }
  onSaveData(){
    this.dataStoreService.storeRecipes()
  }
  onFecthData(){
    this.dataStoreService.fetchRecipes().subscribe()
  }
  onLogout(){
    this.authService.logout()
  }
  ngOnDestroy(){
    this.userSub.unsubscribe()
  }

}
