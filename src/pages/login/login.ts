import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


// @IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  // email: any;
  // password: any;
  loginForm: FormGroup;
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authData: AuthProvider,
    public formBuilder: FormBuilder, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required,
      EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6),
      Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goToResetPassword(){
    this.navCtrl.push('ResetPasswordPage');
  }

  loginUser(){
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then( authData => {
        this.navCtrl.setRoot(HomePage);
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "אישור",
                role: 'ביטול'
              }
            ]
          });
          alert.present();
        });
      });
  
      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }
}
