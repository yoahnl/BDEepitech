import { Component } from '@angular/core';
import {AlertController, IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import { RegisterPage } from "../register/register";
import { User } from "../../models/user";
import { AngularFireAuth } from "angularfire2/auth";
import {ProfilePage} from "../profile/profile";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private menu: MenuController)
  {
  }

  ionViewDidEnter()
  {
   this.menu.swipeEnable(false);
  }
  async login(user:User)
  {
    this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password)
      .then(res => {
        this.navCtrl.setRoot(ProfilePage);
      }, err => {
        let msg;
        switch (err.code) { // SWITCH THE CODE RETURNED TO SEE WHAT MESSAGE YOU'LL DISPLAY
          case "auth/wrong-password":
            msg= "Email or Password is wrong.";
            break;

          case "auth/user-not-found":
            msg= 'User not found.'
            break;

          case "auth/invalid-email":
            msg= 'Email or Password is wrong.';
            break;
        }

        let alert = this.alertCtrl.create({
          title: 'Oups !',
          subTitle: msg,
          buttons: ['OK']
        });
        alert.present();
      });
  }

  register(): void
  {
    this.navCtrl.push(RegisterPage);
  }

  signOut(): void
  {
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }
}
