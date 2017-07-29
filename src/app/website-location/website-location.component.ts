import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Geolocation } from '../shared/geolocation.model';
import { GeolocationService } from '../shared/geolocation.service';

import { MapMarker } from '../shared/map-marker.model';
import { MapService } from '../shared/map.service';

@Component({
    selector: 'website-location',
    templateUrl: './website-location.component.html'
})
export class WebsiteLocationComponent {
    geolocation: Geolocation;
    marker: MapMarker;
    errorMessage: string;
    hostName: string;

    constructor(private geolocationService: GeolocationService, private mapService: MapService) {
        this.geolocation = new Geolocation();
    }

    setLocation() {
        this.errorMessage = '';
        this.geolocationService.findHost(this.hostName)
            .then(geo => {
                this.geolocation = geo;
                this.marker = this.mapService.createMarker(`${this.hostName} Location`, geo.latitude, geo.longitude);
            })
            .catch(err => {
                this.errorMessage = 'Desculpe mas não conseguimos encontrar o seu local.';
                console.log(err);
            });
    }

    resetLocation() {
        this.errorMessage = '';
        this.hostName = '';
        this.geolocation = new Geolocation();
        if (this.marker) {
            this.mapService.removeMarker(this.marker);
            this.marker = null;
        }
    }
}
