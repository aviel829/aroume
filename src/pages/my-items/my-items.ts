import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AroundMeServiceProvider } from '../../providers/AroundMe-service/AroundMe-service';
import { ModalController } from 'ionic-angular';
import { ModalMgtPage } from '../modal-mgt/modal-mgt'
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';
import { PopoverController } from 'ionic-angular';
import { PopOverPage } from '../pop-over/pop-over';

/**
 * Generated class for the MyItemsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-items',
  templateUrl: 'my-items.html',
})
export class MyItemsPage {
  refresh: boolean;
  currentPage: any;

  start: any = 0;
  end: any = 25;
  pageSize: any = 1;
  LocStorageData: any;
  settingData: any;
  salesData: any[] = [];
  modelDetail: any;
  dd: any;
  mm: any;
  fromModelGrp: any;
  toModelGrp: any;
  prevDays: any;
  fromDate: any;
  toDate: any;
  imageBaseUrl: any = 'http://212.179.244.80:8087/AroundMeapp/assets/images/';
  modelYear: any;
  modelSeason: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private arouService: AroundMeServiceProvider,
    public modalCtrl: ModalController, private storage: StorageServiceProvider, public popoverCtrl: PopoverController,
    private loadingCtrl: LoadingController) {

  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopOverPage);
    popover.present({
      ev: myEvent
    });
  }


  doRefresh(refresher) {
    this.refresh = true;
    this.getSales(30);
    if (refresher != 0)
      refresher.complete();
  }

  openModal(modelNum) {
    // this.getModelDetails(modelNum.model)
    let modal = this.modalCtrl.create(ModalMgtPage, modelNum, this.prevDays);
    modal.present();
  }

  ngOnInit() {
    if (this.start === 0)
      this.end = this.currentPage * this.pageSize;
    this.getSales(30);
  }

  ionViewDidLoad() {
    // this.salesData = this.getlocalSales(30);
  }

  getlocalSales(prevDays) {
    this.storage.getStorageKey('salesData').then((value) => {
      return this.salesData = JSON.parse(value);
    });
  }

  getSales(prevDays) {
    this.storage.getStorageKey('settingsData').then((value) => {
      this.settingData = JSON.parse(value);

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

      if (this.settingData.displayMode == true) {
        this.start = "-1";
        this.end = "-1";
      }

      let loading = this.loadingCtrl.create({ content: '...נא להמתין' });
      loading.present();
      this.arouService.getSalesRequet(this.settingData.mm, this.settingData.dd,
        this.settingData.fromModelGrp, this.settingData.toModelGrp, prevDays, this.settingData.fromDate,
        this.settingData.toDate, this.settingData.modelSeason, this.settingData.modelYear,
        this.start, this.end, this.settingData.selectedChkbox)
        // this.arouService.getDailySales('05', '29')
        .subscribe(
        result => {
          let res: any;
          if (this.settingData.displayMode == true)
            this.salesData = [];
          res = JSON.parse(result.d);
          res.map(item => {
            return item;
          }).forEach(element => {
            if (this.salesData !== null)
              this.salesData.push(element);
            else
              this.salesData = element;
          });;
          // this.salesData = res;
        },
        error => {
          loading.dismiss();
          console.log(error)
        },
        () => {
          //console.log(this)
          loading.dismiss();
        }
        );

    });

    console.log(this.salesData);
  }

  loadMore() {
    this.start = (this.currentPage * this.pageSize) + 1;
    this.currentPage++;
    this.end = this.currentPage * this.pageSize;
    this.getSales(0);
  }

}
