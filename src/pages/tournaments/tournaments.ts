import { TeamsPage } from './../teams/teams';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { EliteApiProvider } from '../../providers/elite-api/elite-api';


@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {
  public tournaments: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private eliteAPi: EliteApiProvider,
    public loadingController: LoadingController
  ) {  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: 'Getting tournaments ...',
      spinner: 'dots'
    });

    loader.present().then(() => {
      this.eliteAPi.getTournaments().then(
        data => {
          this.tournaments = data;
          loader.dismiss();
        });
    });
  }

  itemTapped($evt, tournament) {
    this.navCtrl.push(TeamsPage, tournament);
  }

}
