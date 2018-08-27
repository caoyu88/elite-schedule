import { EliteApiProvider } from './../../providers/elite-api/elite-api';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeamHomePage } from '../team-home/team-home';


@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  public teams = [];
  // public teams = [
  //   {id: 1, name: 'HC Elite'},
  //   {id: 2, name: 'Team Takeover'},
  //   {id: 3, name: 'DC Thunder'},
  //   {id: 4, name: 'Miami Heat'}
  // ]

  constructor(public navCtrl: NavController, public navParams: NavParams, public eliteApi: EliteApiProvider) {
  }

  ionViewDidLoad() {
    let selectedTourney = this.navParams.data;
    this.eliteApi.getTournamentData(selectedTourney.id).subscribe(
      data => {
        this.teams = data.teams;
      }
    )
  }

  itemTapped($evt, team) {
    this.navCtrl.push(TeamHomePage, team);
  }

}
