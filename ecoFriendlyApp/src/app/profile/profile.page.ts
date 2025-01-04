import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true, // Ensure this component is standalone
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule] // Import required modules
})
export class ProfilePage implements OnInit {
  profile = {
    id: 0,
    username: '',
    email: '',
    bio: '',
    preferences: ''
  };

  isEditMode = false;
  private apiUrl = 'http://localhost:5010/api/users';

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    await this.loadProfile();
  }

  private async loadProfile() {
    try {
      const userId = localStorage.getItem('userId'); // Fetch user ID from localStorage
      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }
      console.log('GET request for user ID:', userId); // Debugging log
      const response = await this.http.get(`${this.apiUrl}/${userId}`).toPromise();
      this.profile = response as any;
    } catch (error) {
      console.error('Failed to load profile:', error);
      this.showToast('Failed to load profile');
    }
  }

  async onSubmit() {
    if (!this.isEditMode) {
      this.isEditMode = true;
      return;
    }

    try {
      console.log('PUT request with profile data:', this.profile); // Debugging log
      await this.http.put(`${this.apiUrl}/${this.profile.id}`, this.profile).toPromise();
      this.isEditMode = false;
      await this.loadProfile(); // Reload profile after update
      this.showToast('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile:', error);
      this.showToast('Failed to update profile');
    }
  }

  private async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}




 
