import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { StorageServiceProvider } from '../storage-service/storage-service';
/*
  Generated class for the PrefServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PrefServiceProvider {

  constructor(public http: Http, storage: StorageServiceProvider) {

  }


}
