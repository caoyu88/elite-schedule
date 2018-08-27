import { EliteApiProvider } from './../../providers/elite-api/elite-api';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as _ from 'lodash';

@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {
  public team = {};
  public games: any[];
  public tourneyData: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public eliteApi: EliteApiProvider
  ) {  }

  ionViewDidLoad() {
    this.team = this.navParams.data;
    this.tourneyData = this.eliteApi.getCurrentTourney();
    
  }

  goHome() {
    // this.navCtrl.popToRoot();
    console.log('parent - ', this.navCtrl.parent);
    this.navCtrl.parent.parent.popToRoot();
  }

}
