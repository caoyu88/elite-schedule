// import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

/*
  Generated class for the EliteApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EliteApiProvider {
  private baseUrl = 'https://elite-schedule-app-715e6.firebaseio.com/';
  private currentTourney: any;
  private tourneyData = {};

  constructor(public http: Http) {
    console.log('Hello EliteApiProvider Provider');
  }

  // using promise
  getTournaments() {
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/tournaments.json`).subscribe(
        res => resolve(res.json())
      )
    });
  }

  // using rxjs
  getTournamentData(tourneyId, forceRefresh: boolean = false): Observable<any> {
    if(!forceRefresh && this.tourneyData[tourneyId]) {
      this.currentTourney = this.tourneyData[tourneyId];
      console.log('get tourney data from cache');
      return Observable.of(this.currentTourney);
    }

    // get data from server
    console.log('get tourney data from server');
    return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
            .map(response => {
              console.log('resp - ', response);
              this.currentTourney = response.json();
              this.tourneyData[tourneyId] = this.currentTourney;
              return this.currentTourney;
            })
  }

  refreshCurrentTourney() {
    return this.getTournamentData(this.currentTourney.tournament.id, true);
  }

  getCurrentTourney() {
    return this.currentTourney;
  }

}
