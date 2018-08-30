import { UserSettingsProvider } from './../../providers/user-settings/user-settings';
import { TeamHomePage } from './../team-home/team-home';
import { EliteApiProvider } from './../../providers/elite-api/elite-api';
import { TournamentsPage } from './../tournaments/tournaments';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html',
})
export class MyTeamsPage {
  public favorites = [];
  //     {
  //         team: { id: 6182, name: 'HC Elite 7th', coach: 'Michelotti' },
  //         tournamentId: '89e13aa2-ba6d-4f55-9cc2-61eba6172c63',
  //         tournamentName: 'March Madness Tournament'
  //     },
  //     {
  //         team: { id: 805, name: 'HC Elite', coach: 'Michelotti' },
  //         tournamentId: '98c6857e-b0d1-4295-b89e-2d95a45437f2',
  //         tournamentName: 'Holiday Hoops Challenge'
  //     }
  // ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eliteApi: EliteApiProvider,
    private userSettingsProvider: UserSettingsProvider,
    private loadingController: LoadingController
  ) {  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTeamsPage');
  }

  ionViewDidEnter() {
   this.favorites = this.userSettingsProvider.getAllFavorites();
  }

  gotoTournaments() {
    this.navCtrl.push(TournamentsPage);
  }

  favorTapped($evt, item) {
    let loader = this.loadingController.create({
      content: 'Getting data ...',
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentData(item.tournamentId)
      .subscribe(t => this.navCtrl.push(TeamHomePage, item.team));
  }

}
