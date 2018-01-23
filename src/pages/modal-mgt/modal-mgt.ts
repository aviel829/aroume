import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { AroundMeServiceProvider } from '../../providers/AroundMe-service/AroundMe-service';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';

/**
 * Generated class for the ModalMgtPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-modal-mgt',
  templateUrl: 'modal-mgt.html',
})
export class ModalMgtPage {
  LocStorageData: any;
  character;
  modelDetails: any;
  singleModel: any;
  colorDetails: any;
  SizeDetails: any;
  dd: any;
  mm: any;
  fromModelGrp: any;
  toModelGrp: any;
  prevDays: any;
  fromDate: any;
  toDate: any;
  imageBaseUrl: any = 'http://212.179.244.80:8087/AroundMeapp/assets/images/';
  settingData: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private AroundMeService: AroundMeServiceProvider, private storage: StorageServiceProvider) {

    this.singleModel = this.params.get('model')
    this.prevDays = this.params.get('prevDays');

    this.getModelDetails(this.singleModel, this.prevDays);

  }


  getModelDetails(degem, prevDays) {
    this.storage.getStorageKey('settingsData').then(value => {
      this.settingData = JSON.parse(value);
      // this.fromDate = this.LocStorageData.fromDate;
      // this.toDate = this.LocStorageData.toDate;


      let dateString: any;
      if (this.settingData.fromDate !== null && this.settingData.fromDate !== undefined && this.settingData.fromDate !== 0) {
        dateString = this.settingData.fromDate.substr(0, 4) + '-' + this.settingData.fromDate.substr(4, 2) + '-' + this.settingData.fromDate.substr(6, 2);
        let tmpDate: any = new Date(dateString);
        tmpDate.setDate(tmpDate.getDate() - prevDays);
        let tmm = (tmpDate.getUTCMonth() + 1).toString();
        let tdd = tmpDate.getUTCDate().toString();
        if (tmm.length < 2) {
          tmm = '0' + tmm;
        }
        if (tdd.length < 2) {
          tdd = '0' + tdd;
        }

        this.settingData.fromDate = tmpDate.getFullYear() + tmm + tdd;
      }
      else
        dateString = new Date();

      this.AroundMeService.getModelData(degem, this.settingData.mm, this.settingData.dd,
        this.settingData.fromModelGrp, this.settingData.toModelGrp, prevDays,
        this.settingData.fromDate, this.settingData.toDate)
        .subscribe(
        result => this.modelDetails = JSON.parse(result.d),
        error => console.log(error),
        () => console.log(this)
        );
      // console.log(this.modelDetails);

      this.AroundMeService.getModelColorSales(degem, this.settingData.mm, this.settingData.dd,
        this.settingData.fromDate, this.settingData.toDate,prevDays)
        .subscribe(
        result => this.colorDetails = JSON.parse(result.d),
        error => console.log(error),
        () => console.log(this)
        );

      this.AroundMeService.getModelMidaSales(degem, this.settingData.mm, this.settingData.dd, 
        this.settingData.fromDate, this.settingData.toDate,prevDays)
        .subscribe(
        result => this.SizeDetails = JSON.parse(result.d),
        error => console.log(error),
        () => console.log(this)
        );



    });

  };

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ModalMgtPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
