import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [CommonModule, IonicModule]
})
export class HomePage {
  constructor(private navCtrl: NavController) {}

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


