import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitiesRoutingModule } from './cities-routing.module';
import { CitiesComponent } from './components/cities/cities.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app/material/material.module';

import { CitiesReducer } from './state/cities.reducers';
import { CitiesEffects } from './state/cities.effects';

import { routes } from './cities-routing.module';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { EventsByCityComponent } from './components/events-by-city/events-by-city.component';
import { EventsByCityPageComponent } from './components/events-by-city-page/events-by-city-page.component';
import { EventProfileComponent } from '../events/components/event-profile/event-profile.component';
import { SharedMdModule } from '../shared/shared-md/shared-md.module';


@NgModule({
  declarations: [
    CitiesComponent,
    EventsByCityComponent,
    EventsByCityPageComponent,
  ],
  imports: [
    SharedMdModule,
    CommonModule,
    CitiesRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    
    StoreModule.forFeature('citiesState', CitiesReducer),
    EffectsModule.forFeature([CitiesEffects]),
    EffectsModule.forRoot([]),

  ],providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
    ),
  ]
})
export class CitiesModule { }
