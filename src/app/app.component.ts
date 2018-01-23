import { AuthProvider } from './../providers/auth/auth';
import { StorageServiceProvider } from './../providers/storage-service/storage-service';
import { Storage } from '@ionic/storage';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AroundMeServiceProvider } from '../providers/AroundMe-service/AroundMe-service';

// import { TabsPage } from '../pages/tabs/tabs';

// import { AboutPage } from '../pages/about/about';
// import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from "../pages/settings/settings";
import { RentItemPage } from "../pages/week-sales/week-sales";
import { MyItemsPage } from "../pages/month-sales/month-sales";
// import { StatsPage } from "../pages/stats/stats";
import { AngularFireAuth } from 'angularfire2/auth';
// import { LoginPage } from "../pages/login/login";


@Component({
  templateUrl: 'app.html',
  providers: [AroundMeServiceProvider]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;// = HomePage;
  pages: Array<{ title: string, component: any, hidden: any, logout: any }>;

  locStorage: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    afAuth: AngularFireAuth, public AroundMe: AroundMeServiceProvider, public storageService: StorageServiceProvider, 
    public auth: AuthProvider) {
    this.initializeApp();

    const authObserver = afAuth.authState.subscribe(user => {
      if (user) {
        this.rootPage = HomePage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = LoginPage;// 'LoginPage';
        authObserver.unsubscribe();
      }
    });
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'חיפוש פריט', component: HomePage, hidden: false, logout: false },
      { title: 'השכרת פריט', component: RentItemPage, hidden: false, logout: false },
      { title: 'הפריטים שלי', component: MyItemsPage, hidden: false, logout: false },
      { title: 'הגדרות', component: SettingsPage, hidden: false, logout: false },
      { title: 'יציאה', component: LoginPage, hidden: this.auth.isLoggedIn(), logout: true }
    ];

    // this.locStorage = this.storageService.getDataFromStorage();
    // this.AroundMe.getSalesRequet(this.locStorage.mm, this.locStorage.dd, this.locStorage.fromModelGrp, this.locStorage.toModelGrp
      // , this.locStorage.prevDays, this.locStorage.fromDate, this.locStorage.toDate, this.locStorage.modelSeason
      // , this.locStorage.modlYear);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.splashScreen.show();
      this.statusBar.styleDefault();
      // this.AroundMe.getSales(0);
      this.splashScreen.hide();
    });
  }

  openPage(page, logOut) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (logOut)
      this.auth.logoutUser();
    this.nav.setRoot(page.component);
  }

}
