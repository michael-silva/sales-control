import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Geolocation } from '../shared/geolocation.model';
import { GeolocationService } from '../shared/geolocation.service';

import { MapMarker } from '../shared/map-marker.model';
import { MapService } from '../shared/map.service';

@Component({
  selector: 'my-location',
  templateUrl: './my-location.component.html'
})
export class MyLocationComponent {
    geolocation: Geolocation;
    marker: MapMarker;
    errorMessage: string;

    constructor(private geolocationService: GeolocationService, private mapService: MapService) {
        this.geolocation = new Geolocation();
    }

    setLocation() {
        this.errorMessage = '';
        this.geolocationService.findLocal()
            .then(geo => {
                this.geolocation = geo;
                this.marker = this.mapService.createMarker('My Location', geo.latitude, geo.longitude);
            })
            .catch(err => {
                this.errorMessage = 'Desculpe mas não conseguimos encontrar o seu local.';
                console.log(err);
            });
    }

    resetLocation() {
        this.errorMessage = '';
        this.geolocation = new Geolocation();
        if (this.marker) {
            this.mapService.removeMarker(this.marker);
            this.marker = null;
        }
    }
}
