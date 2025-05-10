import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';

import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import { HomeReducer } from './state/home.reducers';
import { HomeEffects } from './state/home.effects';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app/material/material.module';

import { routes } from './home-routing.module';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MyEventsComponent } from './components/my-events/my-events.component';
import { MyEventsPageComponent } from './components/my-events-page/my-events-page.component';
import {CookieService} from 'ngx-cookie-service';
import { SharedMdModule } from '../shared/shared-md/shared-md.module';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['details']})(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];


@NgModule({
  declarations: [
    HomeComponent,
    MyEventsComponent,
    MyEventsPageComponent
  ],
  imports: [
    SharedMdModule,
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forFeature('homeState', HomeReducer, {metaReducers}),
    EffectsModule.forFeature([HomeEffects]),
    EffectsModule.forRoot([])
  ],providers: [
    CookieService,
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
    ),],
})
export class HomeModule { }
