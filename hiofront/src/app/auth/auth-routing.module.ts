import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { JoinComponent } from "./components/join/join.component";
import { UpdateComponent } from "./components/update/update.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "join",
    component: JoinComponent
  },
  {
    path: "settings",
    component: UpdateComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}