///<reference path="../../models/global.ts"/>
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {Profile} from "../../models/profile";
import {Observable} from "rxjs/Observable";
import {UserInfoService} from "../../services/userInfo/UserInfo.service";
import {Global} from "../../models/global";

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
  info: any;
  labels: any;
  header: Observable<any>;

  public myData;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private afDatabase: AngularFireDatabase, private UserInfo: UserInfoService, private global: Global)
  {

  }


  ionViewWillLoad()
  {

    this.afAuth.authState.subscribe(data => {
      this.toast.create({
        message: `Welcome to the Epitech's BDE application ${data.email}`,
        duration: 3000
      }).present();

      console.log(data.uid);


      this.header = this.afDatabase.list('/profile/' + data.uid).valueChanges();
      this.header.subscribe(data =>
      {
        this.myData = data;
        this.global.info = data;
        for (let data of this.myData)
        {
          this.global = data;
        }

      });
    });
    console.log(this.global);
  }

  getUserInfo(): any
  {

    var user = this.afAuth.auth.currentUser;
    if (user) {
      var getUserInfo = this.afDatabase.database.ref('profile/' + user.uid);

      this.info = getUserInfo.once('value', function (snap)
      {

      });
    }
  }


}
