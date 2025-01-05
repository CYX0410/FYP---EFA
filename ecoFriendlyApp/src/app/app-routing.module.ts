import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import your standalone components
import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';
import { ForgotPasswordPage } from './forgot-password/forgot-password.page';
import { HomePage } from './home/home.page';
import { ProfilePage } from './profile/profile.page';
import { TrackingPage } from './tracking/tracking.page';
import { EcoTipsPage } from './eco-tips/eco-tips.page';
import { AboutEFAPage } from './about-efa/about-efa.page';
import { EcoChallengesPage } from './eco-challenges/eco-challenges.page';
import { EcoProductPage } from './eco-product/eco-product.page';

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
  },
  {
    path: 'eco-tips', component: EcoTipsPage
  },
  {
    path: "about-efa", component: AboutEFAPage
  },
  {
    path: "eco-challenges", component: EcoChallengesPage
  },
  {
    path: "eco-product", component: EcoProductPage
  }

  // Other routes here...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
