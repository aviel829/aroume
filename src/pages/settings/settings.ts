import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { StorageServiceProvider } from '../../providers/storage-service/storage-service';
import { PopoverController } from 'ionic-angular';
import { PopOverPage } from '../pop-over/pop-over';
/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  mm: any;
  dd: any;
  weekVal: any;
  monthVal: any;
  today: any;
  fromModelGrp: any;
  toModelGrp: any;
  prevDays: any;
  LocStorageData: any;
  fromDate: any;
  toDate: any;
  modelSeason: any;
  modelYear: any;
  selectedChkbox: any;
  displayMode: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage
    , public popoverCtrl: PopoverController) {
    // this.mm = this.storage.getStorageKey('mm').then((value) => {
    //   this.mm = value
    // });

    // if (this.mm === '' || this.mm === null) {
    // this.initLocalStorage();
    // }

  }


  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopOverPage);
    popover.present({
      ev: myEvent
    });
  }


  // initLocalStorage() {
  //   this.today = new Date();
  //   this.mm = (this.today.getUTCMonth() + 1).toString();
  //   this.dd = this.today.getUTCDate().toString();
  //   if (this.mm.length < 2) {
  //     this.mm = '0' + this.mm;
  //   }
  //   if (this.dd.length < 2) {
  //     this.dd = '0' + this.dd;
  //   }
  //   this.weekVal = 7;
  //   this.monthVal = 30;
  //   this.fromModelGrp = 30;
  //   this.toModelGrp = 73;
  //   this.fromDate = this.today;
  //   this.toDate = this.today;

  //   this.storage.setStorageParam('dd', this.dd);
  //   this.storage.setStorageParam('mm', this.mm);
  //   this.storage.setStorageParam('week', this.weekVal);
  //   this.storage.setStorageParam('month', this.monthVal);
  //   this.storage.setStorageParam('fromModelGrp', this.fromModelGrp);
  //   this.storage.setStorageParam('toModelGrp', this.toModelGrp);
  //   this.storage.setStorageParam('fromDate',this.fromDate);
  //   this.storage.setStorageParam('toDate',this.toDate);
  // }

  ionViewDidLoad() {
    // this.LocStorageData = this.storage.getDataFromStorage();
    // if (this.LocStorageData.mm === null || this.LocStorageData.mm === '') {
    //   this.initLocalStorage();
    // } else {
    //   this.mm = localStorage.mm;
    //   this.dd = localStorage.dd;
    //   this.monthVal = localStorage.month;
    //   this.weekVal = localStorage.week;
    //   this.fromModelGrp = localStorage.fromModelGrp;
    //   this.toModelGrp = localStorage.toModelGrp;
    // }
    //console.log('ionViewDidLoad SettingsPage');
    this.storage.get('settingsData').then(value => {
      this.LocStorageData = JSON.parse(value);
      this.dd = this.LocStorageData.dd;
      this.mm = this.LocStorageData.mm;
      this.monthVal = this.LocStorageData.monthVal;
      this.weekVal = this.LocStorageData.weekVal;
      this.toModelGrp = this.LocStorageData.toModelGrp;
      this.fromModelGrp = this.LocStorageData.fromModelGrp;
      this.fromDate = this.LocStorageData.fromDate;
      this.toDate = this.LocStorageData.toDate;
      this.modelSeason = this.LocStorageData.modelSeason;
      this.modelYear = this.LocStorageData.modelYear;
      this.selectedChkbox = this.LocStorageData.selectedChkbox;
      this.displayMode= this.LocStorageData.displayMode;
    });

  }



}
