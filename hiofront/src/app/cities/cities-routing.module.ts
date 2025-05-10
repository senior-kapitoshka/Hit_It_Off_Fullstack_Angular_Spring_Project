import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitiesComponent } from './components/cities/cities.component';
import { EventsByCityPageComponent } from './components/events-by-city-page/events-by-city-page.component';

export const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: CitiesComponent,
      },
      {
        path: ":city",
        component: EventsByCityPageComponent
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitiesRoutingModule { }
