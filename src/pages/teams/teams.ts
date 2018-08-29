import { EliteApiProvider } from './../../providers/elite-api/elite-api';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamHomePage } from '../team-home/team-home';

import * as _ from "lodash";


@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  public teams = [];
  private allTeams: any;
  private allTeamDivisions: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eliteApi: EliteApiProvider,
    public loadingCOntroller: LoadingController
  ) {  }

  ionViewDidLoad() {
    let selectedTourney = this.navParams.data;
    let loader = this.loadingCOntroller.create({
      content: 'Getting data ...',
      spinner: 'dots',
      dismissOnPageChange: true
    });

    loader.present().then(() => {
      this.eliteApi.getTournamentData(selectedTourney.id).subscribe(
        data => {
          this.allTeams = data.teams;

          this.allTeamDivisions = _.chain(data.teams)
                                    .groupBy('division')
                                    .toPairs()
                                    .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
                                    .value();

          this.teams = this.allTeamDivisions;
          // loader.dismiss();

          console.log('division teams - ', this.teams);

        }
      )
    });


  }

  itemTapped($evt, team) {
    this.navCtrl.push(TeamHomePage, team);
  }

}
