import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { Geolocation } from './geolocation.model';

@Injectable()
export class GeolocationService {
    readonly API_HOST: string = `freegeoip.net`;

    constructor(private http: HttpClient) { }

    _find(host: string = ''): Promise<Geolocation> {
        return new Promise((resolve, reject) => {
            this.http.get<ApiResponseModel>(`http://${this.API_HOST}/json/${host}`)
                .subscribe(res => {
                    resolve({
                        ip: res.ip,
                        city: res.city,
                        country: res.country_name,
                        region: res.region_name,
                        zipCode: res.zip_code,
                        latitude: res.latitude,
                        longitude: res.longitude
                    } as Geolocation);
                },
                err => {
                    reject(err);
                });
        });
    }

    findLocal(): Promise<Geolocation> {
        return this._find();
    }

    findHost(host: string): Promise<Geolocation> {
        return this._find(host);
    }

}

/**
 * Private class only to map response from api
 */
class ApiResponseModel {
    city: string;
    country_code: string;
    country_name: string;
    ip: string;
    latitude: number;
    longitude: number;
    region_code: string;
    region_name: string;
    time_zone: string;
    zip_code: string;
}
