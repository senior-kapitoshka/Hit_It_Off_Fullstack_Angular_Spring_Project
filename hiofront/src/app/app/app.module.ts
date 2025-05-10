import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../app.component';
//import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { headerInterceptor } from '../core/interceptors/header.interceptor';
import { routes } from './app-routing.module';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HomeComponent } from '../home/components/home/home.component';
import { StoreModule } from '@ngrx/store';
import {JwtModule} from '@auth0/angular-jwt';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import {CookieService} from 'ngx-cookie-service';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { IsGrantedDirective } from './directives/is-granted.directive';
import { SharedMdModule } from '../shared/shared-md/shared-md.module';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSidenav } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatMenu, MatMenuModule } from '@angular/material/menu';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    SharedMdModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbar, MatMenu, MatButton, MatIcon,MatSidenav,MatMenuModule,
    StoreModule.forRoot({}, {}),
    JwtModule.forRoot({ // for JwtHelperService
      config: {
        tokenGetter
      }
    })
  ],
  providers: [
    CookieService,
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([headerInterceptor])
    ),],
  bootstrap: [AppComponent]
})
export class AppModule { }