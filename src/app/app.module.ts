import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app.routing';
import { CoreModule } from './core/core.module';

import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';

import { DatatableComponent } from './shared/datatable/datatable.component';
import { ColumnComponent } from './shared/datatable/column.component';
import { ModalComponent } from './shared/modal/modal.component';
import { DropdownComponent } from './shared/dropdown/dropdown.component';
import { InputAutompleteComponent } from './shared/input-autocomplete/input-autocomplete.component';
import { HighlightPipe } from './shared/pipes/highlight.pipe';

import { DclWrapper } from './shared/component-outlet.directive';

import { ProductService } from './shared/products/product.service';
import { SaleService } from './shared/sales/sale.service';

import { ConfigService } from './shared/config.service';

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        CoreModule.forRoot(),
        AppRoutingModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
