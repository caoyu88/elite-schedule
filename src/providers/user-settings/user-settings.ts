import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class UserSettingsProvider {

  constructor(private storage: Storage) {
    console.log('Hello UserSettingsProvider Provider');
  }

  favoriteTeam(team, tournamentId, tournamentName) {
    let item = {
      team: team,
      tournamentId: tournamentId,
      tournamentName: tournamentName
    };

    this.storage.set(team.id.toString(), JSON.stringify(item));
  }

  unfavoriteTeam(team) {
    this.storage.remove(team.id.toString());
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
