import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AroundMeServiceProvider } from '../../providers/AroundMe-service/AroundMe-service';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';
// import { Storage } from '@ionic/storage';


/**
 * Generated class for the PopOverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-pop-over',
  templateUrl: 'pop-over.html',
})
export class PopOverPage {
  // LocStorageData: any;
  settingData: any = [];
  fromModelGroup: any;
  toModelGroup: any;
  fromSelected: number;
  toSelected: number;
  groupChkBox: any;
  selectedChkbox: any[];
  lstText: string = "נא לבחור טווח סוגי פריט";

  fromDate: any;
  toDate: any;
  season: any;
  modelYear: any;
  displayMode: any = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private arouService: AroundMeServiceProvider,
    private viewCtrl: ViewController, private storage: StorageServiceProvider) {
    console.log(viewCtrl);
  }

  getModelTypeList() {
    this.arouService.getModelTypeList()
      // this.arouService.getDailySales('05', '29')
      .subscribe(
      result => {
        this.fromModelGroup = JSON.parse(result.d);
        this.toModelGroup = JSON.parse(result.d);
        this.groupChkBox = JSON.parse(result.d);
      },
      error => console.log(error),
      () => console.log(this)
      );
  }

  ngOnInit() {
    this.storage.getStorageKey("settingsData").then(value => {
      this.settingData = JSON.parse(value);
      if (this.settingData.displayMode !== undefined)
        this.displayMode = this.settingData.displayMode;
    });
    //this.getModelTypeList();
  }

  ionViewDidLoad() {
    this.getModelTypeList();
    // console.log('ionViewDidLoad PopOverPage');
  }

  restoreDefaults() {
    this.storage.setDefaultDataToStorage();
    this.viewCtrl.dismiss();
  }
  saveToStorage() {
    this.storage.getStorageKey('settingsData').then(value => {
      this.settingData = JSON.parse(value);

      if (this.fromSelected !== undefined)
        localStorage.fromModelGrp = this.fromSelected;
      if (this.toSelected !== undefined)
        this.settingData.toModelGrp = this.toSelected;
      if (this.fromDate !== undefined) {
        this.fromDate = this.fromDate.replace(/-/g, '');
        this.settingData.fromDate = this.fromDate;
      }
      if (this.toDate !== undefined) {
        this.toDate = this.toDate.replace(/-/g, '');
        this.settingData.toDate = this.toDate;
      }

      if (this.season !== undefined)
        this.settingData.modelSeason = this.season;
      if (this.modelYear !== undefined)
        this.settingData.modelYear = this.modelYear;

      if (this.selectedChkbox !== undefined)
        this.settingData.selectedChkbox = this.selectedChkbox.toString();
      else
        this.settingData.selectedChkbox = '';

      if (this.displayMode !== undefined)
        this.settingData.displayMode = this.displayMode;
      else
        this.settingData.displayMode = false;

      this.storage.setStorageKey('settingsData', JSON.stringify(this.settingData));

      // this.dd = this.LocStorageData.dd;
      // this.mm = this.LocStorageData.mm;
      // this.monthVal = this.LocStorageData.monthVal;
      // this.weekVal = this.LocStorageData.weekVal;
      // this.toModelGrp = this.LocStorageData.toModelGrp;
      // this.fromModelGrp = this.LocStorageData.fromModelGrp;
      // this.fromDate = this.LocStorageData.fromDate;
      // this.toDate = this.LocStorageData.toDate;
      // this.modelSeason = this.LocStorageData.modelSeason;
      // this.modelYear = this.LocStorageData.modelYear;
    });




    // this.fromSelected = fromSelectedItem;
    // this.viewCtrl.dismiss(this.fromModelGroup, this.toModelGroup);
    this.viewCtrl.dismiss();
  }


}
