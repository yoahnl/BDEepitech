import {Injectable} from "@angular/core";
import {Profile} from "./profile";

@Injectable()
export class Global
{
  info: Profile;
  public username: string;
  public firstname: string;
  public lastname: string;

  getInfo(): Profile
  {
    console.log(this.info);
    return this.info;
  }
}
