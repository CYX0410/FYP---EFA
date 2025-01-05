import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-about-efa',
  templateUrl: './about-efa.page.html',
  styleUrls: ['./about-efa.page.scss'],
  imports: [CommonModule, IonicModule],
})
export class AboutEFAPage {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/home']); // Navigate to the home page
  }
}

