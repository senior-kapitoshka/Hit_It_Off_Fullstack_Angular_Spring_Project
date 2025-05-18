import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinComponent } from '../auth/components/join/join.component';
import { LoginComponent } from '../auth/components/login/login.component';
import { UpdateComponent } from '../auth/components/update/update.component';
import { authGuard } from '../../app/core/guards/auth.guard';
import { adminGuard } from '../core/guards/admin.guard';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
    import("../main/main.module").then((m) => m.MainModule),
  },
  { path: "join", component: JoinComponent,
    loadChildren: () =>
    import("../auth/auth.module").then((m) => m.AuthModule),
},
  { path: "login", component: LoginComponent,
    loadChildren: () =>
    import("../auth/auth.module").then((m) => m.AuthModule), 
  },
  { path: "settings", component: UpdateComponent,
    loadChildren: () =>
    import("../auth/auth.module").then((m) => m.AuthModule),
    canActivate: [ authGuard], 
  },
  { path: "home",
  loadChildren: () =>
    import("../home/home.module").then((m) => m.HomeModule),
    canActivate: [ authGuard], 
  },
  {
    path: "events",
    loadChildren: () =>
      import("../events/events.module").then((m) => m.EventsModule),
      canActivate: [authGuard]
  },
  {
    path: "cities",
    loadChildren: () =>
      import("../cities/cities.module").then((m) => m.CitiesModule),
      canActivate: [authGuard]
  },
  {
    path: "comments",
    loadChildren: () =>
      import("../comments/comments.module").then((m) => m.CommentsModule),
      canActivate: [authGuard]
  },
  {
    path: "users",
    loadChildren: () =>
      import("../users/users.module").then((m) => m.UsersModule),
      canActivate: [adminGuard]
  },

  /*
  IMPORTANT: Notice that the wildcard route is placed at
   the end of the array. The order of your routes is 
   important, as Angular applies routes in order and 
   uses the first match it finds.*/
  {path: '**', component: PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }