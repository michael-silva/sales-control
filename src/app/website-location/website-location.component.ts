import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

import { Geolocation } from '../shared/geolocation.model';
import { GeolocationService } from '../shared/geolocation.service';

import { MapMarker } from '../shared/map-marker.model';
import { MapService } from '../shared/map.service';

@Component({
    selector: 'website-location',
    templateUrl: './website-location.component.html'
})
export class WebsiteLocationComponent {
    static readonly DEFAULT_ERROR: string = 'Sorry, we can\'t find out this host location.';
    geolocation: Geolocation;
    marker: MapMarker;
    errorMessage: string;
    hostName: string;

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
        this.geolocationService.findHost(this.hostName)
            .then(geo => {
                this.geolocation = geo;
                this._clearMark();
                this.marker = this.mapService.createMarker(`${this.hostName} Location`, geo.latitude, geo.longitude);
            })
            .catch(err => {
                this.errorMessage = WebsiteLocationComponent.DEFAULT_ERROR;
                console.log(err);
            });
    }

    resetLocation() {
        this.errorMessage = '';
        this.hostName = '';
        this.geolocation = new Geolocation();
        this._clearMark();
    }

    setLocationForm(form: NgForm) {
        if(form.invalid) return;
        this.setLocation();
    }

    resetLocationForm(form: NgForm) {
        form.reset();
        this.resetLocation();
    }
}
