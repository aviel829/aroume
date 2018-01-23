import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import { AppModule } from './app.module';

//enable production
enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);
