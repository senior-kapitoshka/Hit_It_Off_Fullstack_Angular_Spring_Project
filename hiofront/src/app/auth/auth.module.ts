import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinComponent } from './components/join/join.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import {AuthRoutingModule} from '../auth/auth-routing.module';
import { localStorageSync } from 'ngrx-store-localstorage';
import { authReducer } from './state/auth.reducers';
import { UpdateComponent } from './components/update/update.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/auth.effects';
import { AuthFormComponent } from './components/auth-form/auth-form.component';

import { MaterialModule } from '../app/material/material.module';
/*
ngrx-store-localstorage --> Simple syncing between ngrx store and local or session storage.

localStorageSync(config: LocalStorageConfig): Reducer
Provide state (reducer) keys to sync with local storage. Returns a meta-reducer.

LocalStorageConfig
An interface defining the configuration attributes to bootstrap localStorageSync. The following are properties which compose LocalStorageConfig:

 - keys (required) State keys to sync with local storage. 

...
https://github.com/btroncone/ngrx-store-localstorage
...
*/
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['jwtToken']})(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    JoinComponent,
    LoginComponent,
    UpdateComponent,
    AuthFormComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forFeature('authState', authReducer, {metaReducers}),
    EffectsModule.forFeature([AuthEffects]),
    EffectsModule.forRoot([])
  ]
})
export class AuthModule { }
