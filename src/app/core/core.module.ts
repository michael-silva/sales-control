import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { AppNavbarComponent } from './app-navbar.component';

import { DclWrapper } from '../shared/component-outlet.directive';
import { ProductService } from './products/product.service';
import { SaleService } from './sales/sale.service';
import { LayoutService } from './layout.service';
import { ConfigService } from './config.service';

@NgModule({
    declarations: [
        AppNavbarComponent
    ],
    exports: [
        AppNavbarComponent
    ],
    providers: [
        ProductService,
        SaleService,
        ConfigService,
        LayoutService,
        DclWrapper
    ],
    imports: [
        RouterModule,
        BrowserModule,
        CommonModule,
        SharedModule
    ]
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                ProductService,
                SaleService,
                ConfigService,
                DclWrapper
            ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('SharedModule is already loaded. Import it in the AppModule only');
        }
    }
}
