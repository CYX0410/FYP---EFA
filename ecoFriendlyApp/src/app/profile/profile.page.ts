import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, ToastController, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule]
})
export class ProfilePage{
  profile = {
    username: '',
    email: '',
    bio: '',
    preferences: ''
  };

  constructor( private loadingCtrl: LoadingController, private http: HttpClient, private navCtrl: NavController,  private toastCtrl: ToastController) { }

  async loadProfile() {
    const loading = await this.loadingCtrl.create({ message: 'Loading profile...' });
    await loading.present();

    // Replace this URL with your actual API endpoint
    this.http.get('http://localhost:5010/api/users/login').subscribe({
      next: (data: any) => {
        this.profile = data;
        loading.dismiss();
      },
      error: async (err) => {
        loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Failed to load profile.',
          duration: 2000,
          color: 'danger',
        });
        toast.present();
      },
    });
  }

  async onSubmit() {
    const loading = await this.loadingCtrl.create({ message: 'Saving profile...' });
    await loading.present();

    // Replace this URL with your actual API endpoint
    this.http.post('http://localhost:5010/api/users/login', this.profile).subscribe({
      next: async () => {
        loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Profile updated successfully!',
          duration: 2000,
          color: 'success',
        });
        toast.present();
      },
      error: async (err) => {
        loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Failed to update profile.',
          duration: 2000,
          color: 'danger',
        });
        toast.present();
      },
    });
  }
}
 
