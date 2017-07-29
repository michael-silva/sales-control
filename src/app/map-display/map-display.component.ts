import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { MapMarker } from '../shared/map-marker.model';
import { MapService } from '../shared/map.service';

@Component({
  selector: 'map-display',
  templateUrl: './map-display.component.html'
})
export class MapDisplayComponent {
    private markers: Observable<MapMarker[]>;

    constructor(private mapService: MapService) {
        this.markers = this.mapService.getMarkers();
    }
}
