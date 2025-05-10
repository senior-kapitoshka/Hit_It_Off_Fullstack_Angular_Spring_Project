import { Component,OnInit,ViewChild,AfterViewInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { DataService } from './core/services/data.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-root',
  //imports: [RouterOutlet],
  standalone:false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(){
  }
  title = 'hiofront';
  ngOnInit(): void {
  }
}
