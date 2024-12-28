import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastController, NavController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,                // <--- Standalone component
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule
  ]
})
export class LoginPage {
  username: string = "";
  password: string = "";

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {}

  async onLogin() {
    const payload = {
      username: this.username,
      password: this.password
    };

    this.http.post('http://localhost:5010/api/users/login', payload)
      .subscribe({
        next: async (response: any) => {
          const toast = await this.toastCtrl.create({
            message: response.message,
            duration: 2000,
            color: 'success'
          });
          toast.present();

          // (Optional) Store JWT token if using token-based auth
          // localStorage.setItem('token', response.token);

          // Navigate to some "Home" page or dashboard
          this.navCtrl.navigateRoot('/home');
        },
        error: async (err) => {
          const toast = await this.toastCtrl.create({
            message: err.error.message || 'Login failed',
            duration: 2000,
            color: 'danger'
          });
          toast.present();
        }
      });
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }

  goToForgotPassword() {
    this.navCtrl.navigateForward('/forgot-password');
  }
}

