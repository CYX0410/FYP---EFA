import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastController, NavController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,              // <--- Standalone!
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  // List all the modules you need here:
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule
  ]
})
export class ForgotPasswordPage {
  username: string = '';
  pinNumber: string = '';
  newPassword: string = '';

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {}

  async onForgotPassword() {
    const payload = {
      username: this.username,
      pinNumber: this.pinNumber,
      newPassword: this.newPassword
    };

    this.http.post('http://localhost:3000/api/users/forgot-password', payload)
      .subscribe({
        next: async (response: any) => {
          const toast = await this.toastCtrl.create({
            message: response.message,
            duration: 2000,
            color: 'success'
          });
          toast.present();
          // Redirect back to the login page
          this.navCtrl.navigateRoot('/login');
        },
        error: async (err) => {
          const toast = await this.toastCtrl.create({
            message: err.error.message || 'Password reset failed',
            duration: 2000,
            color: 'danger'
          });
          toast.present();
        }
      });
  }
}
