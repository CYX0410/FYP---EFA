import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
})
export class ProfilePage {
  profile = {
    username: '',
    email: '',
    bio: '',
    preferences: '',
  };

  isEditMode = false; // Controls toggle state (view/edit)
  private apiUrl = 'http://localhost:5010/api/users'; // API base URL

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    const userId = this.getLoggedInUserId();
    if (userId) {
      await this.loadProfile(userId);
    } else {
      await this.showToast('User not authenticated. Please log in.', 'danger');
      // Redirect to login if necessary
    }
  }

  async loadProfile(userId: string) {
    const loading = await this.loadingCtrl.create({ message: 'Loading profile...' });
    await loading.present();

    this.http.get(`${this.apiUrl}/profile?userId=${userId}`).subscribe({
      next: (data: any) => {
        console.log('Profile data loaded:', data); 
        this.profile = {
          ...this.profile,
          username: data.username || '', // Populate the profile fields
          email: data.email || '',
          bio: data.bio || '',
          preferences: data.preferences || '',
        };
        loading.dismiss();
      },
      error: async (err) => {
        loading.dismiss();
        await this.showToast(`Failed to load profile. ${err.error?.message || 'Unknown error'}`, 'danger');
      },
    });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode; // Toggle between edit/view mode
  }

  async onSubmit() {
    if (!this.isEditMode) {
      this.toggleEditMode(); // Switch to edit mode if not already in edit mode
      return;
    }

    if (!this.validateEmail(this.profile.email)) {
      await this.showToast('Invalid email format. Please use a valid Gmail address.', 'warning');
      return;
    }
  
    const loading = await this.loadingCtrl.create({ message: 'Saving profile...' });
    await loading.present();
  
    const payload = {
      userId: this.getLoggedInUserId(), // Include the userId when sending the data
      username: this.profile.username,
      email: this.profile.email,
      bio: this.profile.bio,
      preferences: this.profile.preferences,
    };
  
    this.http.post(`${this.apiUrl}/profile`, payload).subscribe({
      next: async () => {
        loading.dismiss();
        await this.showToast('Profile updated successfully!', 'success');
      },
      error: async (err) => {
        loading.dismiss();
        await this.showToast(`Failed to update profile. ${err.error?.message || 'Unknown error'}`, 'danger');
      },
    });
  }
  

  getLoggedInUserId(): string {
    const token = localStorage.getItem('token'); // Retrieve the JWT from localStorage
    if (!token) {
      return ''; // Return empty or handle unauthenticated state
    }
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
      return payload.userId; // Extract the userId from the payload
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return ''; // Return empty or handle unauthenticated state
    }
  }
  
  

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(email);
  }

  private async showToast(message: string, color: 'success' | 'warning' | 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
  }
}



 
