import { TestBed, async } from '@angular/core/testing';

import { MapDisplayComponent } from './map-display.component';
import { MapService } from '../shared/map.service';

import { AgmCoreModule } from '@agm/core';


describe('MapDisplayComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MapDisplayComponent
            ],
            imports: [
                AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyABoh-b6DLMcmUl77LMk20UWHpUffRqeN0'
                })
            ],
            providers: [MapService]
        }).compileComponents();
    }));

    it('should create the component', async(() => {
        const fixture = TestBed.createComponent(MapDisplayComponent);
        const component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    }));
});
