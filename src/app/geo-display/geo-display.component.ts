import { Component, Input } from '@angular/core';

import { Geolocation } from '../shared/geolocation.model'

@Component({
  selector: 'geo-display',
  templateUrl: './geo-display.component.html'
})
export class GeoDisplayComponent {
    @Input()
    geolocation: Geolocation;

    constructor() {
        this.geolocation = new Geolocation();
    }
}
