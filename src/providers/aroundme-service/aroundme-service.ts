import { LoadingController } from 'ionic-angular';
// import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';

/*
  Generated class for the AroundMeServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AroundMeServiceProvider {

  baseWsUrl = 'http://212.179.244.80:8087/AroundMeWS/service.asmx/';
  salesData: any;
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
  selectedChkbox: any;

  constructor(public http: Http, private storage: StorageServiceProvider, private loadingCtrl: LoadingController) {
  }

  getModelMidaSales(modelNum, month, day, fromDate, toDate, prevDays) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    //return this.http.post(this.baseWsUrl + 'getModelMidaSales',
      return this.http.get('app/TempData/data.json')
      {
        modelNum: modelNum,
        month: month,
        day: day,
        fromDate: fromDate,
        toDate: toDate,
        prevDays: prevDays,
        headers: headers
      })
      .map(
      response => response.json()
      );
  }

  getModelColorSales(modelNum, month, day, fromDate, toDate, prevDays) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    //return this.http.post(this.baseWsUrl + 'getModelColorSales',
      return this.http.get('app/TempData/data.json')
      {
        modelNum: modelNum,
        month: month,
        day: day,
        fromDate: fromDate,
        toDate: toDate,
        prevDays: prevDays,
        headers: headers
      })
      .map(
      response => response.json()
      );
  }

  getSalesRequet(mm, dd, fromModelGrp, toModelGrp, prevDays, fromDate, toDate,
    modelSeason, modelYear, start, end, selectedChkbox) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    //return this.http.post(this.baseWsUrl + 'GetSalesPerModelJson',
      return this.http.get('app/TempData/data.json')
      {
        month: mm,
        day: dd,
        fromSogPrit: fromModelGrp,
        toSogPrit: toModelGrp,
        prevDays: prevDays,
        fromDate: fromDate,
        toDate: toDate,
        modelSeason: modelSeason,
        modelYear: modelYear,
        start: start,
        end: end,
        selectedChkbox: selectedChkbox,
        headers: headers
      })
      .map(
      response => response.json(),
      this.storage.setStorageKey('salesData', JSON.stringify(this.salesData))

      );
  }


  getSales(prevDays, LocStorageData: any) {
    // this.storage.getStorageKey('mm').then((value) => {
    //   this.mm = value;
    // });
    // this.storage.getStorageKey('fromModelGrp').then((value) => {
    //   this.fromModelGrp = value;
    // });
    // this.storage.getStorageKey('toModelGrp').then((value) => {
    //   this.toModelGrp = value;
    // });
    // this.storage.getStorageKey('fromDate').then((value) => {
    //   this.fromDate = value;
    //   if (this.fromDate !== undefined)
    //     this.fromDate = this.fromDate.replace(/-/g, '');
    //   console.log(this.fromDate);
    // });
    // this.storage.getStorageKey('toDate').then((value) => {
    //   this.toDate = value;
    //   if (this.toDate !== undefined)
    //     this.toDate = this.toDate.replace(/-/g, '');
    //   console.log(this.toDate);
    // });

    // this.storage.getStorageKey('modelSeason').then((value) => {
    //   this.modelSeason = value;
    //   console.log(this.modelSeason);
    // });

    // this.storage.getStorageKey('modelYear').then((value) => {
    //   this.modelYear = value;
    //   console.log(this.modelYear);
    // });

    // this.storage.getStorageKey('dd').then((value) => {
    //   this.dd = value;
    //   let dateString: any = this.fromDate.substr(0, 4) + '-' + this.fromDate.substr(4, 2) + '-' + this.fromDate.substr(6, 2);
    //   let tmpDate: any = new Date(dateString);
    //   tmpDate.setDate(tmpDate.getDate() - prevDays);
    //   let tmm = (tmpDate.getUTCMonth() + 1).toString();
    //   let tdd = tmpDate.getUTCDate().toString();
    //   if (tmm.length < 2) {
    //     tmm = '0' + tmm;
    //   }
    //   if (tdd.length < 2) {
    //     tdd = '0' + tdd;
    //   }
    //   this.fromDate = tmpDate.getFullYear() + tmm + tdd;
    // this.storage.getStorageKey('settingsData').then(value => {
    //   LocStorageData = JSON.parse(value);
    //   if (LocStorageData === null || LocStorageData === "")
    //     this.storage.setDefaultDataToStorage();
    // let loading = this.loadingCtrl.create();
    // loading.present();


    // this.getSalesRequet(LocStorageData.mm, LocStorageData.dd, LocStorageData.fromModelGrp,
    //   LocStorageData.toModelGrp, prevDays, LocStorageData.fromDate, LocStorageData.toDate,
    //   LocStorageData.modelSeason, LocStorageData.modelYear).then(
    //   result => {
    //     this.salesData = JSON.parse(result.d);
    //     if (this.salesData !== null || this.salesData !== "") {
    //       this.storage.setStorageKey('salesData', JSON.stringify(this.salesData))
    //     };
    //     console.log(this.salesData);
    //     return this.salesData;
    //   }).catch((error => {
    //     console.log(error);
    //   }));



    // })
    //     .then(() => {
    //     this.storage.getStorageKey('settingsData').then(value => {
    //       LocStorageData = JSON.parse(value);

    //       // let loading = this.loadingCtrl.create();
    //       // loading.present();
    //       this.getSalesRequet(LocStorageData.mm, LocStorageData.dd, LocStorageData.fromModelGrp,
    //         LocStorageData.toModelGrp, prevDays, LocStorageData.fromDate, LocStorageData.toDate,
    //         LocStorageData.modelSeason, LocStorageData.modelYear)
    //         // this.arouService.getDailySales('05', '29')
    //         .subscribe(
    //         result => {
    //           this.salesData = JSON.parse(result.d),
    //             this.storage.setStorageKey('salesData', JSON.stringify(this.salesData))
    //           return this.salesData;
    //           // loading.dismiss();
    //         },
    //         error => {
    //           console.log(error);
    //           // loading.dismiss();
    //         },
    //         () => {
    //           // this.presentToast('הנתונים נטענו בהצלחה');
    //           // loading.dismiss();
    //         }
    //         );

    //     });
    //   });

    // });

    // console.log(this.salesData);
  }

  // loadWeekSales(mm, dd, fromModelGrp, toModelGrp) {
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   return this.http.post(this.baseWsUrl + 'GetWeekSalesPerModelJson',
  //     // return this.http.get('app/TempData/data.json')
  //     {
  //       month: mm,
  //       day: dd,
  //       fromSogPrit: fromModelGrp,
  //       toSogPrit: toModelGrp,
  //       headers: headers
  //     })
  //     .map(
  //     response => response.json()
  //     );
  // }



  getModelTypeList() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.baseWsUrl + 'getModelTypeList',
      // return this.http.get('app/TempData/data.json')
      {
        headers: headers
      }
    )
      .map(
      response => response.json()
      );
  }

  getModelData(degem, mm, dd, fromModelGrp, toModelGrp, prevDays, fromDate, toDate) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.baseWsUrl + 'getModelDetails',
      // return this.http.get('app/TempData/data.json')
      {
        modelNum: degem,
        month: mm,
        day: dd,
        fromSogPrit: fromModelGrp,
        toSogPrit: toModelGrp,
        prevDays: prevDays,
        fromDate: fromDate,
        toDate: toDate,
        headers: headers
      }
    )
      .map(
      response => response.json()
      );
  }

}
