import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import{LoginPage} from '../login/login';
/**
 * Generated class for the UserDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html',
    providers:[UserServiceProvider]
})
export class UserDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams , private userServiceProvider: UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetailPage');
  }

  logUserOut(){
    // call user service
      this.userServiceProvider.logoutUser().then(()=>{
          this.navCtrl.setRoot(LoginPage);
      });
  }

}
