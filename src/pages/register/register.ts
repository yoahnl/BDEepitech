import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from "../../models/user";
import {AngularFireDatabase} from "angularfire2/database";
import {LoginPage} from "../login/login";
import {AngularFireAuth} from "angularfire2/auth";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',

})
export class RegisterPage
{

  user = {} as User;
  header;
  db;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, afDatabase: AngularFireDatabase, public afAuth: AngularFireAuth)
  {
    this.db = afDatabase;
  }

  async register(user: User)
  {
    console.log(user);
    this.header = this.db.list('validAdress').valueChanges();
    this.header.subscribe(datas =>
    {
      for (let data of datas)
      {
        if (user.email == data)
        {
          try
          {
            const result = this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
            console.log(result);
            let alert = this.alertCtrl.create({
              title: 'Congratulation !',
              subTitle: "You now have a fully fonctional account !",
              buttons: ['OK']
            });
            alert.present().then(() => this.navCtrl.setRoot(LoginPage));
            return;
          }
          catch (e)
          {
            console.log(e);
            console.log(e);

            let alert = this.alertCtrl.create({
              title: 'Oups !',
              subTitle: e,
              buttons: ['OK']
            });
            alert.present();
          }

        }
        else
        {

        }
      }
      let alert = this.alertCtrl.create({
        title: 'Oups !',
        subTitle: 'Votre adresse n\'est pas autorisée à créer un compte !',
        buttons: ['OK']
      });
      alert.present();
    });


  }

}
