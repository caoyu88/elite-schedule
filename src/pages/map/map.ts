import { EliteApiProvider } from './../../providers/elite-api/elite-api';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

declare let window: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  public map: any;
  public game: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private eliteApiProvider: EliteApiProvider
  ) {
    this.game = this.navParams.data;
    let tourneyData = this.eliteApiProvider.getCurrentTourney();
    let location = tourneyData.locations[this.game.locationId];
    
    this.map = {
      lat: location.latitude,
      lng: location.longitude,
      zoom: 12,
      markerLabel: this.game.location
    };
    console.log('map - ', this.map);
  }

  ionViewDidLoad() {
  }

  goToDirection() {
    window.location = `geo:${this.map.lat},${this.map.lng};u=35`;
  }

}
