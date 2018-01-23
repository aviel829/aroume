import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, ToastController } from 'ionic-angular';
import { AroundMeServiceProvider } from '../../providers/AroundMe-service/AroundMe-service';
import { ModalController, ViewController } from 'ionic-angular';
import { ModalMgtPage } from '../modal-mgt/modal-mgt'
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';
import { PopOverPage } from '../pop-over/pop-over';
import { IonPullUpFooterState } from 'ionic-pullup';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  refresh: boolean = false;
  @ViewChild(NavController) nav: NavController;
  @ViewChild(ViewController) viewCtrl: ViewController;

  footerState: IonPullUpFooterState;

  start: any = 0;
  end: any = 0;
  pageSize: any = 25;
  currentPage: any = 1;
  LocStorageData: any;
  settingData: any = [];
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

  // singeModel: any;
  constructor(public navCtrl: NavController, private arouService: AroundMeServiceProvider,
    public modalCtrl: ModalController, private storage: StorageServiceProvider,
    public toastCtrl: ToastController, public popoverCtrl: PopoverController, private loadingCtrl: LoadingController) {
    this.footerState = IonPullUpFooterState.Collapsed;
  }

  footerExpanded() {
    console.log('Footer expanded!');
  }

  footerCollapsed() {
    console.log('Footer collapsed!');
  }

  toggleFooter() {
    this.footerState = this.footerState == IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopOverPage);
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(() => {
      this.getSales(0);
    })
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  doRefresh(refresher) {
    //this.arouService.getSales(0, this.LocStorageData);
    //this.getlocalSales(0);
    this.refresh = true;
    this.getSales(0);
    if (refresher != 0)
      refresher.complete();
  }

  openModal(modelNum) {
    // this.getModelDetails(modelNum.model)
    let modal = this.modalCtrl.create(ModalMgtPage, modelNum, this.prevDays);
    modal.present();
  }

  ngOnInit() {
    //this.storage.setDefaultDataToStorage();
    if (this.start === 0)
      this.end = this.currentPage * this.pageSize;
    this.getSales(0);
    // console.log('ngOnInit');
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
        this.settingData.toDate, this.settingData.modelSeason, this.settingData.modelYear, this.start,
        this.end, this.settingData.selectedChkbox)
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

  ionViewDidLoad() {
    // this.salesData = this.getlocalSales(0);
    this.getSales(0);
    console.log('ionViewDidLoad');
  }

  // getSales(prevDays, LocStorageData) {
  //   this.arouService.getSalesRequet(LocStorageData.mm, LocStorageData.dd, LocStorageData.fromModelGrp,
  //     LocStorageData.toModelGrp, prevDays, LocStorageData.fromDate, LocStorageData.toDate,
  //     LocStorageData.modelSeason, LocStorageData.modelYear).subscribe(
  //     result => {
  //       this.salesData = JSON.parse(result.d);
  //       if (this.salesData !== null || this.salesData !== "") {
  //         this.storage.setStorageKey('salesData', JSON.stringify(this.salesData))
  //       };
  //       console.log(this.salesData);
  //       //this.salesData;
  //     });
  // }

  ionViewWillEnter() {
    // this.storage.setDefaultDataToStorage();
  }
}
