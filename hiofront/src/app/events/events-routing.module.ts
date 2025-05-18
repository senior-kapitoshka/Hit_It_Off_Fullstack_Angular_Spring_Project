import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { EventsListPageComponent } from './components/events-list-page/events-list-page.component';
import { EventsFormPageComponent } from './components/events-form-page/events-form-page.component';
import { EventViewPageComponent } from './components/event-view-page/event-view-page.component';
import { EventEditComponent } from './components/event-edit/event-edit.component';
import { EventsArchivePageComponent } from './components/events-archive-page/events-archive-page.component';

export const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: EventsListPageComponent,
      },
      {
        path: "form",
        component: EventsFormPageComponent,
      },
      {
        path: "archive",
        component: EventsArchivePageComponent,
      },

      {
        path: ":id",
        children: [
          {
            path: "",
            component: EventViewPageComponent,
          },
          {
            path: "edit",
            component: EventEditComponent
          },
        ]
        
      },
      
    ]
  },


];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule { }
