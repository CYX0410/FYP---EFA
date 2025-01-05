import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-eco-challenges',
  templateUrl: './eco-challenges.page.html',
  styleUrls: ['./eco-challenges.page.scss'],
  imports: [CommonModule, IonicModule],

})
export class EcoChallengesPage {

  constructor(private router: Router) { }

  goBack() {
    this.router.navigate(['/home']); // Navigate to the home page
  }
}
