import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MyEventsPageComponent } from './components/my-events-page/my-events-page.component';

export const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: HomeComponent,
      },
      {
        path: "my-events",
        component: MyEventsPageComponent,
      },
    ]
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
