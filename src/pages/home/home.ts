import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage
{

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private toast: ToastController)
  {
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      this.toast.create({
        message: `Welcome to the Epitech's BDE application ${data.email}`,
        duration: 3000
      }).present();
    });
  }

}
