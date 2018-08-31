import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular'

@Injectable()
export class UserSettingsProvider {

  constructor(
    private storage: Storage,
    private events: Events
  ) {
    console.log('Hello UserSettingsProvider Provider');
  }

  favoriteTeam(team, tournamentId, tournamentName) {
    let item = {
      team: team,
      tournamentId: tournamentId,
      tournamentName: tournamentName
    };

    this.storage.set(team.id.toString(), JSON.stringify(item));
    this.events.publish('favor:changed');
  }

  unfavoriteTeam(team) {
    this.storage.remove(team.id.toString());
    this.events.publish('favor:changed');
  }

  isFavotiteTeam(teamId: string): Promise<boolean> {
    return this.storage.get(teamId).then(val => val ? true : false);
  }

  getAllFavorites() {
    let results = [];
    this.storage.forEach(data => {
      console.log('*** inside storage.foreach ***', data);
      results.push(JSON.parse(data));
    });
    return results;
  }

}
