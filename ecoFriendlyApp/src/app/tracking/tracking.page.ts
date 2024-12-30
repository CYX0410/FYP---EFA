import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  standalone: true,

  selector: 'app-tracking',
  templateUrl: './tracking.page.html',
  styleUrls: ['./tracking.page.scss'],
  imports: [CommonModule, IonicModule]
})
export class TrackingPage{
  constructor(private navCtrl: NavController) { }
}
