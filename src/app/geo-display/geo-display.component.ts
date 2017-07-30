import { Component, Input } from '@angular/core';

import { Geolocation } from '../shared/geolocation.model';
import { GeolocationService } from '../shared/geolocation.service';

@Component({
  selector: 'geo-display',
  templateUrl: './geo-display.component.html'
})
export class GeoDisplayComponent {
    @Input()
    geolocation: Geolocation;
    showingHelp: boolean;
    helpLabel: string;
    apiHost: string;

    get isEmpty() {
        return !this.geolocation.country;
    }

    constructor() {
        this.geolocation = new Geolocation();
        this.apiHost = GeolocationService.API_HOST;
    }

    showHelp(label: string) {
        this.showingHelp = true;
        this.helpLabel = label;
    }

    hideHelp() {
        this.showingHelp = false;
        this.helpLabel = '';
    }
}
