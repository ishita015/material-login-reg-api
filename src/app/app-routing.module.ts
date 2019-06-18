import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegComponent } from './reg/reg.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
  {
    path:"",
    component:LoginComponent,
    
  },
  {
    path:"dashboard",
    component:DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"reg",
    component:RegComponent
  },
  {
    path:"home",
    component:HomeComponent,
    
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard]
})
export class AppRoutingModule { }
