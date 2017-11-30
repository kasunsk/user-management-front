import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import {AuthGuard} from "./_guards/auth.guard";
import {AdminComponent} from "./admin/admin.component";

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
