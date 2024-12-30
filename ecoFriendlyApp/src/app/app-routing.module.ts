import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import your standalone components
import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';
import { ForgotPasswordPage } from './forgot-password/forgot-password.page';
import { HomePage } from './home/home.page';
import { ProfilePage } from './profile/profile.page';
import { TrackingPage } from './tracking/tracking.page';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'forgot-password', component: ForgotPasswordPage },
  { path: 'home', component: HomePage },
  {
    path: 'profile', component:ProfilePage
  },
  {
    path: 'tracking', component: TrackingPage
  }

  // Other routes here...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
