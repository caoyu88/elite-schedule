import { MapPage } from './../map/map';
import { TeamHomePage } from './../team-home/team-home';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApiProvider } from '../../providers/elite-api/elite-api';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  public game: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eliteApi: EliteApiProvider
  ) {
    console.log('this.game - ', this.navParams.data);
    this.game = this.navParams.data;
  }

  ionViewDidLoad() {
    this.game.gameTime = Date.parse(this.game.time);
  }

  teamTapped(teamId) {
    let tourneyData = this.eliteApi.getCurrentTourney();
    console.log('tourneyData - ', tourneyData);
    let team = tourneyData.teams.find(t => t.id===teamId);
    this.navCtrl.push(TeamHomePage, team);
  }

  isWinner(s1, s2) {
    return Number(s1) > Number(s2) ? 'primary' : 'danger';
  }

  goToMap() {
    this.navCtrl.push(MapPage);
  }

  goToDirection() {

  }

}
