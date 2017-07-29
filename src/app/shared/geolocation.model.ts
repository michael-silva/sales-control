export class Geolocation {
    id: number;
    ip: string;
    country: string;
    region: string;
    city: string;
    zipCode: string;
    latitude: number;
    longitude: number;

    constructor() {
        this.ip = '0.0.0.0';
    }
}
