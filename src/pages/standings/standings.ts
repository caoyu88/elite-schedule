import { EliteApiProvider } from './../../providers/elite-api/elite-api';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as _ from 'lodash';

@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {
  public allStandings: any[];
  public standings: any[];
  public team: any;
  public divisionFilter = 'division';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eliteApi: EliteApiProvider
  ) {
    this.team = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTourney();
    this.standings = tourneyData.standings;

    // flat data structure for virtual scrolling
    this.allStandings = tourneyData.standings;

    // this.allStandings =
    //       _.chain(this.standings)
    //         .groupBy('division')
    //         .toPairs()
    //         .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
    //         .value();
    console.log('standings - ', this.standings);
    console.log('division standings - ', this.allStandings);

    this.filterDivision();
  }

  ionViewDidLoad() {


  }

  getHeader(record, rcdIndex, records) {
    if(rcdIndex === 0 || record.division !== records[rcdIndex-1].division) {
      return record.division;
    }

    return null;
  }

  filterDivision() {
    if( this.divisionFilter==='all' ) {
      this.standings = this.allStandings;
    } else {
      this.standings = _.filter(this.allStandings, s => s.division === this.team.division);
    }
  }

}
