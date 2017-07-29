import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import { MapMarker } from './map-marker.model';

@Injectable()
export class MapService {
    private _markers: MapMarker[];
    private _maps: Subscriber<MapMarker[]>[];

    constructor() {
        this._maps = [];
        this._markers = [];
    }

    _notify() {
        this._maps.forEach(m => m.next(this._markers));
    }

    getMarkers(): Observable<MapMarker[]> {
        return new Observable<MapMarker[]>(subscriber => {
            this._maps.push(subscriber);
        });
    }

    addMarker(marker: MapMarker) {
        this._markers.push(marker);
        this._notify();
    }

    createMarker(title: string, latitude: number, longitude: number): MapMarker {
        const marker: MapMarker = { title: title, latitude: latitude, longitude: longitude } as MapMarker;
        this.addMarker(marker);
        return marker;
    }

    removeMarker(marker: MapMarker) {
        const i = this._markers.findIndex(m => m === marker);
        this._markers.splice(i, 1);
        this._notify();
    }

    removeFrom(latitude: number, longitude: number) {
        this._markers = this._markers.filter(m => m.latitude !== latitude || m.longitude !== longitude);
        this._notify();
    }

    clear() {
        this._markers = [];
        this._notify();
    }

}
