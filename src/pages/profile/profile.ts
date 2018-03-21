import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import {Profile} from "../../models/profile";
import {AngularFireDatabase} from "angularfire2/database";
import {HomePage} from "../home/home";
import {Observable} from "rxjs/Observable";
import {UserInfoService} from "../../services/userInfo/UserInfo.service";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile = {} as Profile;
  header: Observable<any>;
  public myData;
  show: boolean = false;

  constructor(private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private UserInfo: UserInfoService, public loadingCtrl: LoadingController)
  {
    this.afAuth.authState.subscribe(user => {
      if (user)
      {
        return;
      }
    })
  }



  createProfile(profile: Profile)
  {
    this.afAuth.authState.subscribe(auth =>
      {
        profile.uid = auth.uid;
        this.UserInfo.setUserInfo(profile).then(() => this.navCtrl.setRoot(HomePage));
      }
    );
  }

  ionViewWillLoad()
  {


    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 1500);
    this.afAuth.authState.subscribe(data => {
      this.header = this.afDatabase.list('/profile/' + data.uid).valueChanges();
      this.header.subscribe(data =>
      {

        this.myData = data;
        if (data.length > 0)
        {
          this.navCtrl.setRoot(HomePage);
        }
        this.show = true;
      });
    });
  }
}
