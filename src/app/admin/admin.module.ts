import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      {path: '', redirectTo: "/admin/login", pathMatch: "full"},
      {path: 'login', component: LoginPageComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'create-post', component: CreatePageComponent},
      {path: 'edit-post/:id', component: EditPageComponent},
    ]
  }
];

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardComponent,
    CreatePageComponent,
    EditPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminModule {
}
