import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ProductsComponent } from './products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductStockComponent } from './product-stock/product-stock.component';
import { SharedModule } from '../shared/shared.module';

import { ProductsRoutingModule } from './products.routing';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule ,
        HttpClientModule,
        ProductsRoutingModule,
        SharedModule
    ],
    declarations: [
        ProductsComponent,
        ProductListComponent,
        ProductFormComponent,
        ProductStockComponent,
    ],
    schemas:   [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ProductsModule { }
