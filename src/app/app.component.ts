import { EliteApiProvider } from './../providers/elite-api/elite-api';
import { TeamHomePage } from './../pages/team-home/team-home';
import { UserSettingsProvider } from './../providers/user-settings/user-settings';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyTeamsPage } from '../pages/my-teams/my-teams';
import { TournamentsPage } from '../pages/tournaments/tournaments';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyTeamsPage;

  pages: Array<{title: string, component: any}>;

  favoriteTeams: any[];

  constructor(
    private events: Events,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private userSettingsProvider: UserSettingsProvider,
    private loadingController: LoadingController,
    private eliteApiProvider: EliteApiProvider
  ) {
    this.initializeApp();
    this.refreshFavoriteTeams();
    this.events.subscribe('favor:changed', () => this.refreshFavoriteTeams());
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // this lifecycle event only for Pages - won't be triggered here
  // ionViewDidEnter(){
  //  this.refreshFavoriteTeams();
  // }

  refreshFavoriteTeams() {
    this.favoriteTeams = this.userSettingsProvider.getAllFavorites();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goHome() {
    this.nav.push(MyTeamsPage);
  }

  gotoTeam(t) {
    let loader = this.loadingController.create({
      content: 'Loading data ...',
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApiProvider.getTournamentData(t.tournamentId).subscribe(
      item => this.nav.push(TeamHomePage, t.team)
    )
  }

  goTournaments() {
    this.nav.push(TournamentsPage);
  }
}
