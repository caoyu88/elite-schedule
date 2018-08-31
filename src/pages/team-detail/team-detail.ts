import { UserSettingsProvider } from './../../providers/user-settings/user-settings';
import { EliteApiProvider } from './../../providers/elite-api/elite-api';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import * as _ from 'lodash';
import moment from 'moment';
import { GamePage } from '../game/game';

@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {
  private allGames: any[];
  public dateFilter: string;
  public team: any;
  public teamStanding: any;
  public games: any[];
  public tourneyData: any;
  public useDateFilter = false;
  public isFollowing = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eliteApi: EliteApiProvider,
    private alertController: AlertController,
    private toastController: ToastController,
    private userSettingsProvider: UserSettingsProvider
  ) {
    this.team = this.navParams.data;
    console.log('this.team - ', this.team);

    this.tourneyData = this.eliteApi.getCurrentTourney();
    console.log('this.tourneyData - ', this.tourneyData);
    this.games = _.chain(this.tourneyData.games)
                  .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
                  .map(g => {
                      let isTeam1 = (g.team1Id === this.team.id);
                      let opponentName = isTeam1 ? g.team2 : g.team1;
                      let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
                      return {
                          gameId: g.id,
                          opponent: opponentName,
                          time: Date.parse(g.time),
                          location: g.location,
                          locationUrl: g.locationUrl,
                          scoreDisplay: scoreDisplay,
                          homeAway: (isTeam1 ? "vs." : "at")
                      };
                  })
                  .value();
    this.allGames = this.games;

    this.teamStanding = _.find(this.tourneyData.standings, { 'teamId': this.team.id});
    console.log('this.teamStanding - ', this.teamStanding);
  }

  ionViewDidLoad() {
    this.userSettingsProvider.isFavotiteTeam(this.team.id.toString()).then(value => this.isFollowing = value);
  }

  dateChanged() {
    if(this.useDateFilter) {
      this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
    } else {
      this.games = this.allGames;
    }

  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) {
        var teamScore = (isTeam1 ? team1Score : team2Score);
        var opponentScore = (isTeam1 ? team2Score : team1Score);
        var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
        return winIndicator + teamScore + "-" + opponentScore;
    }
    else {
        return "";
    }
  }

  toggleFollowing() {
    if(this.isFollowing) {
      let confirm = this.alertController.create({
        title: 'Unfollow',
        message: 'Are you sure you want to unfollow?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.isFollowing = false;
              // persiste data
              this.userSettingsProvider.unfavoriteTeam(this.team);

              let toast = this.toastController.create({
                message: 'You have unfollowed this team.',
                duration: 2500,
                position: 'bottom'
              });
              toast.present();
            }
          },
          {
            text: 'No'
          }
        ]
      });
      confirm.present();
    } else {
      this.isFollowing = true;
      // persist data
      this.userSettingsProvider.favoriteTeam(this.team, this.tourneyData.tournament.id, this.tourneyData.tournament.name);
    }
  }

  gameClicked($evt, game) {
    let sourceGame = this.tourneyData.games.find(g => g.id===game.gameId);
    console.log('sourceGame - ', sourceGame);
    this.navCtrl.parent.parent.push(GamePage, sourceGame);
  }

  getScoreWorL(game) {
    return game.scoreDisplay ? game.scoreDisplay[0] : '';
  }

  getBadgeDisplayClass(game) {
    return game.scoreDisplay.indexOf('W:') === 0 ? 'primary' : 'danger';
  }

  refreshAll(refresher) {
    this.eliteApi.refreshCurrentTourney().subscribe(() => {
      refresher.complete();
      this.ionViewDidLoad();
    })
  }

  goHome() {
    // this.navCtrl.popToRoot();
    console.log('parent - ', this.navCtrl.parent);
    this.navCtrl.parent.parent.popToRoot();
  }

}
