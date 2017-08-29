import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Import HttpClientModule from @angular/common/http
import { HttpClientModule } from '@angular/common/http';

import { DatatableComponent } from './datatable/datatable.component';
import { ColumnComponent } from './datatable/column.component';

import { ModalComponent } from './modal/modal.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { DropdownService } from './dropdown/dropdown.service';

import { DclWrapper } from './component-outlet.directive';

import { InputAutompleteComponent } from './input-autocomplete/input-autocomplete.component';
import { HighlightPipe } from './pipes/highlight.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    declarations: [
        DatatableComponent,
        ColumnComponent,
        ModalComponent,
        DropdownComponent,
        HighlightPipe,
        InputAutompleteComponent,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        DatatableComponent,
        ColumnComponent,
        ModalComponent,
        DropdownComponent,
        HighlightPipe,
        InputAutompleteComponent,
    ],
    providers: [
        DropdownService
    ]
})
export class SharedModule { }
