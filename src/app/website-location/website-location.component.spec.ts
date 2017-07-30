import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';

import { WebsiteLocationComponent } from './website-location.component';
import { GeoDisplayComponent } from '../geo-display/geo-display.component';
import { Geolocation } from '../shared/geolocation.model';
import { MapMarker } from '../shared/map-marker.model';
import { GeolocationService } from '../shared/geolocation.service';
import { MapService } from '../shared/map.service';


describe('WebsiteLocationComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                HttpClientModule
            ],
            declarations: [
                GeoDisplayComponent,
                WebsiteLocationComponent
            ],
            providers: [GeolocationService, MapService]
        }).compileComponents();
    }));

    it('should create the component', fakeAsync(() => {
        const fixture = TestBed.createComponent(WebsiteLocationComponent);
        const component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    }));

    it('should geolocation is empty', fakeAsync(() => {
        const fixture = TestBed.createComponent(WebsiteLocationComponent);
        const component = fixture.debugElement.componentInstance;
        fixture.detectChanges();

        expect(component.geolocation).toEqual(new Geolocation());
        expect(component.marker).toBeNull();
    }));

    it('set location request success should clear error message, set local and create a map marker', fakeAsync(() => {
        const fixture = TestBed.createComponent(WebsiteLocationComponent);
        const component = fixture.debugElement.componentInstance;

        const hostName = 'www.test.com';
        const testGeo = { latitude: 1000, longitude: 1000, city: 'test', region: 'test', country: 'test' } as Geolocation;
        const testMarker = { latitude: testGeo.latitude, longitude: testGeo.longitude, title: `${hostName} Location`} as MapMarker;

        const geoService = fixture.debugElement.injector.get(GeolocationService);

        // Setup spy on the `findHost` method
        const spy = spyOn(geoService, 'findHost')
            .and.returnValue(Promise.resolve(testGeo));
        
        component.hostName = hostName;
        fixture.detectChanges();
        component.setLocation();

        tick();
        fixture.detectChanges();

        expect(spy.calls.any()).toBe(true, 'findHost called');
        expect(component.geolocation).toEqual(testGeo);
        expect(component.marker).toEqual(testMarker);
        expect(component.errorMessage).toEqual('');
        expect(component.hostName).toEqual(hostName);
    }));

    it('set location request error should set error message and clear data', fakeAsync(() => {
        const fixture = TestBed.createComponent(WebsiteLocationComponent);
        const component = fixture.debugElement.componentInstance;

        const geoService = fixture.debugElement.injector.get(GeolocationService);

        // Setup spy on the `findHost` method
        const spy = spyOn(geoService, 'findHost')
            .and.returnValue(Promise.reject('error'));

        component.setLocation();
        fixture.detectChanges();

        tick();
        fixture.detectChanges();

        expect(spy.calls.any()).toBe(true, 'findHost called');
        expect(component.geolocation).toEqual(new Geolocation());
        expect(component.marker).toBeNull();
        expect(component.errorMessage).toEqual(WebsiteLocationComponent.DEFAULT_ERROR);
    }));

    it('should reset location having a location', fakeAsync(() => {
        const fixture = TestBed.createComponent(WebsiteLocationComponent);
        const component = fixture.debugElement.componentInstance;

        const testGeo = { latitude: 1000, longitude: 1000, city: 'test', region: 'test', country: 'test' } as Geolocation;

        const geoService = fixture.debugElement.injector.get(GeolocationService);

        // Setup spy on the `findHost` method
        const spy = spyOn(geoService, 'findHost')
            .and.returnValue(Promise.resolve(testGeo));

        component.setLocation();
        fixture.detectChanges();

        tick();
        fixture.detectChanges();

        component.resetLocation();
        tick();
        fixture.detectChanges();

        expect(component.geolocation).toEqual(new Geolocation());
        expect(component.marker).toBeNull();
        expect(component.hostName).toEqual('');
        expect(component.errorMessage).toEqual('');
    }));

    it('should reset location not having a location', fakeAsync(() => {
        const fixture = TestBed.createComponent(WebsiteLocationComponent);
        const component = fixture.debugElement.componentInstance;

        component.resetLocation();
        fixture.detectChanges();

        expect(component.geolocation).toEqual(new Geolocation());
        expect(component.marker).toBeNull();
        expect(component.hostName).toEqual('');
        expect(component.errorMessage).toEqual('');
    }));
});
