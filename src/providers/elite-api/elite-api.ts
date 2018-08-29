// import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the EliteApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EliteApiProvider {
  private baseUrl = 'https://elite-schedule-app-715e6.firebaseio.com/';
  private currentTourney: any;

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
  getTournamentData(tourneyId): Observable<any> {
    return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
            .map(response => {
              console.log('resp - ', response);
              this.currentTourney = response.json();
              return this.currentTourney;
            })
  }

  getCurrentTourney() {
    return this.currentTourney;
  }

}
