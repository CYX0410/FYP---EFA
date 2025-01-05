import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AboutEFAComponent } from '../about-efa/about-efa.component';
@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [CommonModule, IonicModule]
})
export class HomePage {
  constructor(private navCtrl: NavController, private alertController: AlertController, private router: Router, private modalController: ModalController) {}

  async showAboutEFA() {
    const modal = await this.modalController.create({
      component: AboutEFAComponent,
    });
    await modal.present();
  }
  
  logout() {
    // Clear any session data if necessary
    // localStorage.clear(); // Example: Clear local storage
    this.router.navigate(['/login']); // Navigate to login page
  }

  goToProductRecommendation() {
    // Navigate to a "ProductRecommendationPage", for example
    this.navCtrl.navigateForward('/product-recommendation');
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


