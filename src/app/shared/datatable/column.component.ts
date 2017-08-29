import { Input, Component } from '@angular/core';

import { DatatableComponent } from './datatable.component';
import { ColumnModel } from './column.model';

@Component({
    selector: 'column',
    templateUrl: './column.component.html'
})
export class ColumnComponent extends ColumnModel {
    @Input() title: string;

    constructor(table: DatatableComponent) {
        super();
        table.addColumn(this);
    }
}
