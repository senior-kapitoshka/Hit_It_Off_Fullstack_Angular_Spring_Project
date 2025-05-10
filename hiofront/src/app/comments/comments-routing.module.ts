import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsEditComponent } from './components/comments-edit/comments-edit.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: ":id",
        component: CommentsEditComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentsRoutingModule { }
