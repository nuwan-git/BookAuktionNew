import { Component } from '@angular/core';
import { NavController,ViewController, ModalController  } from 'ionic-angular';
import { LoginPage } from '../login/login';
import{UserDetailPage} from '../user-detail/user-detail';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private modalCtrl: ModalController) {

  }

// function for close the register page
  // function for redirect the register form
  // submitRegister() {
  //   let registerModal = this.modalCtrl.create(LoginPage);
  //   registerModal.present();
  // }

  redirectToUserDetailPage(){
      this.navCtrl.push(UserDetailPage);
  }
}
