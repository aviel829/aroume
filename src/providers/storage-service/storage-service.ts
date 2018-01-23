import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
// import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
// import { SQLite, SQLiteObject, SQLiteDatabaseConfig } from '@ionic-native/sqlite';

/*
  Generated class for the S
  torageServiceProvider provider.

  See https://angular.io/docs/sts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class StorageServiceProvider {
  // settings: any = {};

  // : any;
  // : any;
  // : any;
  // : any;
  // : any;
  LocStorageData: any = {};
  // : any;
  // : any;
  // : any;
  // : any;
  // : any;
  // : any;
  // : any;

  constructor(public http: Http, private storage: Storage) {


  }

  // getStorageKey(pKey) {
  //   this.storage.get(pKey).then((value) => {
  //     return value;
  //   });
  // }
  getStorageKey(pKey) {
    return this.storage.get(pKey);// .then((value) => {
    // return value;
    // });
  }

  setStorageKey(pKey, pValue) {
    this.storage.set(pKey, pValue);
  }

  setDefaultDataToStorage() {
    this.LocStorageData.today = new Date();
    let newDate = new Date(this.LocStorageData.today);
    this.LocStorageData.mm = (newDate.getUTCMonth() + 1).toString();
    this.LocStorageData.dd = newDate.getUTCDate().toString();
    if (this.LocStorageData.mm.length < 2) {
      this.LocStorageData.mm = '0' + this.LocStorageData.mm;
    }
    if (this.LocStorageData.dd.length < 2) {
      this.LocStorageData.dd = '0' + this.LocStorageData.dd;
    }
    this.LocStorageData.weekVal = 7;
    this.LocStorageData.monthVal = 30;
    this.LocStorageData.fromModelGrp = 300;
    this.LocStorageData.toModelGrp = 970;
    let month: any = (newDate.getUTCMonth() + 1);
    month = month <= 9 ? '0' + month : month;
    let year: any = newDate.getFullYear().toString();
    let day: any = newDate.getUTCDate().toString();
    day = day <= 9 ? ('0' + day).toString() : day.toString();
    this.LocStorageData.fromDate = 0;// year + month + day;
    this.LocStorageData.toDate = 0;//this.LocStorageData.fromDate;
    this.LocStorageData.modelSeason = '';
    this.LocStorageData.modelYear = '';
    this.LocStorageData.selectedChkbox = '';
    this.storage.get("settingsData").then(value => {
      let tmpSettings = JSON.parse(value);
      this.LocStorageData.displayMode = tmpSettings.displayMode;

      this.storage.set('settingsData', JSON.stringify(this.LocStorageData)).then(res => {
        return this.LocStorageData;
      });
    });

    // if (this.LocStorageData.fromDate !== undefined)
    // this.LocStorageData.fromDate = this.LocStorageData.fromDate.replace(/-/g, '');
    // if (this.LocStorageData.toDate !== undefined)
    // this.LocStorageData.toDate = this.LocStorageData.toDate.replace(/-/g, '');



  }

  getDataFromStorage() {
    this.storage.get('settingsData').then((value) => {
      this.LocStorageData.settingsData = value;
    });
    this.getStorageKey('mm').then((value) => {
      this.LocStorageData.mm = value;
    });
    this.getStorageKey('fromModelGrp').then((value) => {
      this.LocStorageData.fromModelGrp = value;
    });
    this.getStorageKey('toModelGrp').then((value) => {
      this.LocStorageData.toModelGrp = value;
    });
    this.getStorageKey('prevDays').then((value) => {
      this.LocStorageData.prevDays = value;
    });

    this.getStorageKey('dd').then((value) => {
      this.LocStorageData.dd = value;
    });
    this.getStorageKey('week').then((value) => {
      this.LocStorageData.weekVal = value;
    });
    this.getStorageKey('month').then((value) => {
      this.LocStorageData.monthVal = value;
    });
    this.getStorageKey('fromDate').then((value) => {
      this.LocStorageData.fromDate = value;
    });
    this.getStorageKey('toDate').then((value) => {
      this.LocStorageData.toDate = value;
    });

    this.getStorageKey('modelSeason').then((value) => {
      this.LocStorageData.modelSeason = value;
      console.log(this.LocStorageData.modelSeason);
    });

    this.getStorageKey('modelYear').then((value) => {
      this.LocStorageData.modelYear = value;
      console.log(this.LocStorageData.modelYear);
    });

    // localStorage.mm = this.mm;
    // localStorage.dd = this.dd;
    // localStorage.week = this.weekVal;
    // localStorage.month = this.monthVal;
    // localStorage.fromModelGrp = this.fromModelGrp;
    // localStorage.toModelGrp = this.toModelGrp;
    // localStorage.fromDate = this.fromDate;
    // localStorage.toDate = this.toDate;
    // localStorage.modelSeason = this.modelSeason;
    // localStorage.modelYear = this.modelYear;

    return this.LocStorageData;
  }

  setStorageParam(pKey, pVal) {
    // this.storage.set(pKey, pVal);
  }
}

