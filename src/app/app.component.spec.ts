import { TestBed, async } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { GeolocationService } from './shared/geolocation.service';
import { MapService } from './shared/map.service';

import { AppComponent } from './app.component';
import { MyLocationComponent } from './my-location/my-location.component';
import { WebsiteLocationComponent } from './website-location/website-location.component';
import { MapDisplayComponent } from './map-display/map-display.component';
import { GeoDisplayComponent } from './geo-display/geo-display.component';

import { AgmCoreModule } from '@agm/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FormsModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyABoh-b6DLMcmUl77LMk20UWHpUffRqeN0'
        })
      ],
      declarations: [
        MyLocationComponent,
        WebsiteLocationComponent,
        MapDisplayComponent,
        GeoDisplayComponent,
        AppComponent
      ],
      providers: [GeolocationService, MapService],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  /*
  it(`should have as title 'app'`, async(() => {
  const fixture = TestBed.createComponent(AppComponent);
  const app = fixture.debugElement.componentInstance;
  expect(app.title).toEqual('app');
  }));

  it('should render title in a h1 tag', async(() => {
  const fixture = TestBed.createComponent(AppComponent);
  fixture.detectChanges();
  const compiled = fixture.debugElement.nativeElement;
  expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));
  */
});
