import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoggedGuard } from '../core/guards/logged.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    // canActivate: [LoggedGuard],
    path: "login",
    component: LoginComponent
  },
  {
    // canActivate: [LoggedGuard],
    path: "register",
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
