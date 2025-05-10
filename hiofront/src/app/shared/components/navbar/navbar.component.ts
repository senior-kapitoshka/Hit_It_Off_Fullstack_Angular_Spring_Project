import { Component , Input, OnChanges, OnInit, inject,ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../core/services/auth.service';
import { DataService } from '../../../core/services/data.service';
import { HomeService } from '../../../core/services/home.service';
import {CookieService} from 'ngx-cookie-service';
import { AuthActions } from '../../../auth/state/auth.actions';
import { AppState } from '../../../app/state/app.state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone:false,
  providers: [CookieService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  encapsulation: ViewEncapsulation.None 
})
export class NavbarComponent implements OnInit{
  cookieService = inject(CookieService);
 username!:string;
  showNav:boolean=true;
  role!:string;

  private subscriptions = new Subscription();

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router,
    public dataService: DataService,
  ) {
  }
ngOnInit(): void {
 const log= this.dataService.currentState.subscribe(islog=>{
    this.showNav = islog;  
  });
  const name= this.dataService.currentName.subscribe(name=>{
      this.username =name?name: this.cookieService.get("username")
  });
  const role=  this.dataService.currentRole.subscribe(role=>{
    this.role =role?role: this.cookieService.get("role")
  });

  this.subscriptions.add(log);
  this.subscriptions.add(name);
  this.subscriptions.add(role);
}

ngOnDestroy(): void {
  this.subscriptions.unsubscribe();
}


  logout(){
    this.authService.logout();

  }
}
