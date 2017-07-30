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
    static readonly DEFAULT_ERROR: string = 'Sorry, we can\'t find out your location.';
    geolocation: Geolocation;
    marker: MapMarker;
    errorMessage: string;

    constructor(private geolocationService: GeolocationService, private mapService: MapService) {
        this.geolocation = new Geolocation();
        this.marker = null;
    }

    _clearMark() {
        if (this.marker) {
            this.mapService.removeMarker(this.marker);
            this.marker = null;
        }
    }

    setLocation() {
        this.errorMessage = '';
        this.geolocationService.findLocal()
            .then(geo => {
                this.geolocation = geo;
                this._clearMark();
                this.marker = this.mapService.createMarker('My Location', geo.latitude, geo.longitude);
            })
            .catch(err => {
                this.errorMessage = MyLocationComponent.DEFAULT_ERROR;
                console.log(err);
            });
    }

    resetLocation() {
        this.errorMessage = '';
        this.geolocation = new Geolocation();
        this._clearMark();
    }
}
