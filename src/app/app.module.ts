import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GeoDisplayComponent } from './geo-display/geo-display.component';

@NgModule({
  declarations: [
    AppComponent,
    GeoDisplayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
