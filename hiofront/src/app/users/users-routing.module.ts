import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListPageComponent } from './components/users-list-page/users-list-page.component';

export const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: UsersListPageComponent,
      },
    ]
    }
  ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
