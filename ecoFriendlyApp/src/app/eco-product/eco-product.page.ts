import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-eco-product',
  templateUrl: './eco-product.page.html',
  styleUrls: ['./eco-product.page.scss'],
  imports: [CommonModule, IonicModule],
})
export class EcoProductPage{

  constructor(private router: Router) { }
  goBack() {
    this.router.navigate(['/home']); // Navigate to the home page
  }
}
