import { TestBed, async } from '@angular/core/testing';

import { GeoDisplayComponent } from './geo-display.component';
import { Geolocation } from '../shared/geolocation.model';
import { GeolocationService } from '../shared/geolocation.service';


describe('GeoDisplayComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                GeoDisplayComponent
            ],
            providers: [GeolocationService]
        }).compileComponents();
    }));

    it('should create the component', async(() => {
        const fixture = TestBed.createComponent(GeoDisplayComponent);
        const component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    }));

    it('should geolocation is empty', async(() => {
        const fixture = TestBed.createComponent(GeoDisplayComponent);
        const component = fixture.debugElement.componentInstance;
        fixture.detectChanges();

        expect(component.geolocation).toEqual(new Geolocation());
        expect(component.isEmpty).toBeTruthy();
    }));

    it('should apiHost be equal to geolocation static API_HOST', async(() => {
        const fixture = TestBed.createComponent(GeoDisplayComponent);
        const component = fixture.debugElement.componentInstance;
        fixture.detectChanges();

        expect(component.apiHost).toEqual(GeolocationService.API_HOST);
    }));

    it('should showHelp setting label and show help message', async(() => {
        const fixture = TestBed.createComponent(GeoDisplayComponent);
        const component = fixture.debugElement.componentInstance;
        const label = 'testing label';
        component.showHelp(label);
        fixture.detectChanges();

        expect(component.showingHelp).toBeTruthy();
        expect(component.helpLabel).toEqual(label);
    }));

    it('should hideHelp clear label and hide help message', async(() => {
        const fixture = TestBed.createComponent(GeoDisplayComponent);
        const component = fixture.debugElement.componentInstance;
        const label = 'testing label';
        component.hideHelp(label);
        fixture.detectChanges();

        expect(component.showingHelp).toBeFalsy();
        expect(component.helpLabel).toEqual('');
    }));
});
