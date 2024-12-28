import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastController, NavController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,                 // <--- Turn it into a standalone component
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,       // Required for Ionic components
    HttpClientModule   // Required for HttpClient
  ]
})
export class RegisterPage {
  username: string = "";
  password: string = "";
  pinNumber: string = "";

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {}

  async onRegister() {
    const payload = {
      username: this.username,
      password: this.password,
      pinNumber: this.pinNumber
    };

    this.http.post('http://localhost:5010/api/users/register', payload)
      .subscribe({
        next: async (response: any) => {
          const toast = await this.toastCtrl.create({
            message: response.message,
            duration: 2000,
            color: 'success'
          });
          toast.present();
          // Navigate to Login page
          this.navCtrl.navigateRoot('/login');
        },
        error: async (err) => {
          const toast = await this.toastCtrl.create({
            message: err.error.message || 'Registration failed',
            duration: 2000,
            color: 'danger'
          });
          toast.present();
        }
      });
  }
}

