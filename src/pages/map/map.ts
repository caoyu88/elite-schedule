import { EliteApiProvider } from './../../providers/elite-api/elite-api';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  public map: any;

  constructor(
    public navCtrl: NavController, 
    private eliteApiProvider: EliteApiProvider,
    public navParams: NavParams
  ) {
    let games = this.navParams.data;
    let tourneyData = this.eliteApiProvider.getCurrentTourney();
    let location = tourneyData.locations[games.locationId];
    
    this.map = {
      lat: location.latitude,
      lng: location.longitude,
      zoom: 12,
      markerLabel: games.location
    };
    console.log('map - ', this.map);
  }

  ionViewDidLoad() {
  }

}
