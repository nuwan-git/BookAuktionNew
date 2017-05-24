import { Component } from '@angular/core';
// added ModalController for direct page from login page to register page
import { AlertController,ToastController,IonicPage, LoadingController, NavController, NavParams, ModalController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { HomePage } from '../home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[UserServiceProvider]
})
export class LoginPage {

  public emailField: any;
  public passwordField: any;
  private users = [];
  private usersList: any;

  // created a variable modalCtrl
  constructor(private navCtrl: NavController, public navParams: NavParams
    , private modalCtrl: ModalController
    , private userServiceProvider: UserServiceProvider
    , private loadingCtrl: LoadingController
    ,private toastCtrl:ToastController
    , private alertCtrl: AlertController) {
    this.emailField = "nuwanrathnayaka.c@gmail.com  ";

    this.listOurUsers();
  }

  signUserUp() {
    this.userServiceProvider.signUpUser(this.emailField, this.passwordField)
      .then(authData => {
        //succesfull

        this.navCtrl.setRoot(HomePage);
      }, error => {
        // alert("Error Login in"+error.message);
       
          let alert = this.alertCtrl.create({
      title: 'Error Sign Up!',
      subTitle: 'Error Message!',
      buttons: ['OK']
    });
    alert.present();
         
      });

     let loader = this.loadingCtrl.create({
       dismissOnPageChange: true,
     });
     loader.present();

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  //login
  submitLogin() {
     this.userServiceProvider.logingUser(this.emailField, this.passwordField)
      .then(authData => {
        //succesfull

        this.navCtrl.setRoot(HomePage);
      }, error => {
        // alert("Error Login in"+error.message);
          let alert = this.alertCtrl.create({
          title: 'Error Login In!',
          subTitle: 'Error Message!',
          buttons: ['OK']
        });
        alert.present();

      });
         let loader = this.loadingCtrl.create({
          dismissOnPageChange: true,
     });
        loader.present();
  }

  // function for redirect the register form
  submitRegister() {
    let registerModal = this.modalCtrl.create(RegisterPage);
    registerModal.present();
  }

  listOurUsers() {
    this.userServiceProvider.loadUser(10)
      .subscribe(data => {
        this.usersList = data.results;
        console.log(data);   
        // stores  the dataa comming form user-service load user save usersList
      })
  }

  showForgotPassword(){
         let prompt = this.alertCtrl.create({
           title :'Enter Your Email',
           message:"A new password will be sent to your Email",
           inputs:[
             {
               name:'recoverEmail',
               placeholder:'you@example.com',
             },
           ],
           buttons:[
             {
               text:'Cancel',
               handler: data=>{
                 console.log('Cancel Clicked');
               }
             },
             {
               text:'Submit',
               handler: data=>{
                   // console.log("A little sentence to it"+data.recoverEmail);
                   //add preloader

                   let loading=this.loadingCtrl.create({
                      dismissOnPageChange:true,
                      content:'Reaseting Your Password'
                   });
                   loading.present();
              this.userServiceProvider.forgotPasswordUsere(data.recoverEmail).then(()=>{
                    loading.dismiss().then(()=>{
                      //shoew pop upu
                       let alert = this.alertCtrl.create({
                  title:'Check your Email',
                  subTitle :'password Reset Suucessfully',
                  buttons:['OK']
                });
                alert.present();

                    })
              },error =>{
                //show popup
                  loading.dismiss().then(()=>{
                let alert = this.alertCtrl.create({
                  title:'Errro Resetting Password',
                  subTitle :error.message,
                  buttons:['OK']
                });
                alert.present();
                  })
              });
             }
             }
           ]

         });
         prompt.present();
  }

  googlesSignIn(){
    this.userServiceProvider.googleSignInUser().then(()=>{
        let toast = this.toastCtrl.create({
          message: 'User account created succesfully...',
          duration:3000
        });
        toast.present();
    })
  }

}
