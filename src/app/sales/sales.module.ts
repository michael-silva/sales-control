import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';

import { SalesRoutingModule } from './sales.routing';
import { SalesComponent } from './sales.component';
import { SaleCheckoutComponent } from './sale-checkout/sale-checkout.component';
import { SaleCheckoutPaymentComponent } from './sale-checkout/sale-checkout-payment.component';
import { SaleCheckoutDiscountComponent } from './sale-checkout/sale-checkout-discount.component';
import { SaleListComponent } from './sale-list/sale-list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule ,
        HttpClientModule,
        SalesRoutingModule,
        SharedModule
    ],
    declarations: [
        SalesComponent,
        SaleCheckoutComponent,
        SaleCheckoutDiscountComponent,
        SaleCheckoutPaymentComponent,
        SaleListComponent
    ],
    schemas:   [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SalesModule { }
