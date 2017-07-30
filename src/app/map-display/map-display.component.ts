import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { MapMarker } from '../shared/map-marker.model';
import { MapService } from '../shared/map.service';

import { LatLngBounds, MapsAPILoader } from '@agm/core';

@Component({
    selector: 'map-display',
    templateUrl: './map-display.component.html'
})
export class MapDisplayComponent implements OnInit {
    private markers: MapMarker[];
    private bounds: LatLngBounds;

    constructor(
        private mapService: MapService,
        private mapsAPILoader: MapsAPILoader) { }

    ngOnInit(): void {
         this.mapsAPILoader.load()
            .then(() => {
                this.mapService.getMarkers()
                    .subscribe(markers => {
                        this.markers = markers;
                        this.bounds = new window['google'].maps.LatLngBounds();
                        this.markers.forEach(marker => {
                            this.bounds.extend(new window['google'].maps.LatLng(marker.latitude, marker.longitude));
                        });
                    });
            });
    }
}
