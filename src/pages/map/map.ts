import { EliteApiProvider } from './../../providers/elite-api/elite-api';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: any;

  constructor(
    public navCtrl: NavController, 
    private eliteApiProvider: EliteApiProvider,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    let games = this.navParams.data;
    let tourneyData = this.eliteApiProvider.getCurrentTourney();
    let location = tourneyData.locations[games.locationId];

    this.map = {
      lat: location.latitude,
      lng: location.longtitude,
      zoom: 12,
      markerLabel: games.location
    };

    

  }

}
