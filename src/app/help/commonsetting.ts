import {HttpHeaders} from '@angular/common/http';

export class Commonsetting{

  public static GridHeight(): number {

    return document.documentElement.clientHeight - 310;
  }
  public static GridHeight2(): number {

    return document.documentElement.clientHeight - 320;
  }
  public static GridHeight3(): number {

    return document.documentElement.clientHeight - 360;
  }
  public static GridHeight4(): number {

    return document.documentElement.clientHeight - 370;
  }
  public static GridHeightshort(): number {

    return document.documentElement.clientHeight - 520;
  }
  public static GridHeightshort2(): number {

    return document.documentElement.clientHeight - 530;
  }
  public  static HttpJsonHead(): HttpHeaders {
    return  new HttpHeaders({'Content-Type': 'application/json'});
  }
}
