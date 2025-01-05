import { Component } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-about-efa',
  standalone: true, // Mark as standalone
  imports: [IonicModule], // Import IonicModule for Ionic components
  templateUrl: './about-efa.component.html',
  styleUrls: ['./about-efa.component.scss'],
})
export class AboutEFAComponent {
  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }
}

