import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [CommonModule, IonicModule]
})
export class ProfilePage{

  constructor(private navCtrl: NavController) { }

 

}
