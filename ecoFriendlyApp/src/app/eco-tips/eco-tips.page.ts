import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-eco-tips',
  templateUrl: './eco-tips.page.html',
  styleUrls: ['./eco-tips.page.scss'],
  imports: [CommonModule, IonicModule],
})
export class EcoTipsPage {

  constructor(private router: Router) { }
  goBack() {
    this.router.navigate(['/home']); // Navigate to the home page
  }
}
