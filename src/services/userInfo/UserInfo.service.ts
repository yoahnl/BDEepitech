import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import {Profile} from "../../models/profile";
import {Observable} from "rxjs/Observable";


@Injectable()

export class UserInfoService
{

  private UserInfoRef = this.db.list<Profile>('profile');
  private Uid;
  header: Observable<any>;
  private info;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth)
  {
    this.afAuth.authState.subscribe(auth =>
    {
      this.Uid = auth.uid;
      this.UserInfoRef = this.db.list<Profile>("profile/" + this.Uid);
    });
  }

  printUid()
  {
    console.log(this.Uid);
  }

  FindUserInfo()
  {

    this.header = this.db.list('/profile/' + this.Uid).valueChanges();
    this.header.subscribe(data =>
    {
      this.info = data;
     // console.log(this.info);

    });
  }

  getUserInfo()
  {
    return this.UserInfoRef;
  }
  setUserInfo(profile: Profile)
  {
    return this.UserInfoRef.push(profile);
  }
}
