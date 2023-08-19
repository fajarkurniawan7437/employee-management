import { RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {EmployeeFormComponent} from "./employee/employee-form/employee-form.component";
import {EmployeeListComponent} from "./employee/employee-list/employee-list.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {NotFoundComponent} from "./shared/not-found/not-found.component";
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  {
    path: 'employee-list',
    component: EmployeeListComponent
  },
  {
    path: 'employee-add',
    component: EmployeeFormComponent
  },
  {
    path: 'employee-edit/:id',
    component: EmployeeFormComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
