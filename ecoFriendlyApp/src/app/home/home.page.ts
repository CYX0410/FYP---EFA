import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [CommonModule, IonicModule]
})
export class HomePage {
  isDialogOpen = false;
  constructor(private navCtrl: NavController, private alertController: AlertController, private router: Router, private modalController: ModalController) {}

  logout() {
    this.isDialogOpen = true; // Open the dialog
  }

  cancelLogout() {
    this.isDialogOpen = false; // Close the dialog without action
  }

  confirmLogout() {
    this.isDialogOpen = false; // Close the dialog
    // Clear session data if necessary
    // localStorage.clear(); // Example: Clear local storage
    this.router.navigate(['/login']); // Navigate to the login page
  }

  showAboutEFA(){
    this.router.navigate(['/about-efa']); // Navigate to about-efa page
  }
  goToProductRecommendation() {
    // Navigate to a "ProductRecommendationPage", for example
    this.navCtrl.navigateForward('/eco-product');
  }

  goToEcoTips() {
    // Navigate to a "EcoTipsPage"
    this.navCtrl.navigateForward('/eco-tips');
  }

  goToEcoChallenges() {
    // Navigate to a "EcoChallengesPage"
    this.navCtrl.navigateForward('/eco-challenges');
  }
}


