import { Input, Component, ContentChild, TemplateRef, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { TableModel, TablePage } from './datatable.model';
import { ColumnModel, OrderBy } from './column.model';
import { ColumnComponent } from './column.component';

class Util {
    static Set(target: any, obj: any) {
        for(let key in obj) {
            target[key] = obj[key];
        }
    }
}

@Component({
    selector: 'datatable',
    templateUrl: './datatable.component.html'
})
export class DatatableComponent implements OnInit {
    pagging: TablePage[];
    columns: ColumnModel[];
    table: TableModel;
    allChecked: boolean;
    checks: number[];

    @Input() url:string;
    @Input() defaultOrder: string;
    @Input() lengths: number[];

    @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;

    constructor(private http: HttpClient) {
        this.table = new TableModel();
        this.columns = [];
        this.pagging = [];
        this.checks = [];
        this.lengths = [10, 25, 50, 100];
    }

    ngOnInit() {
        localStorage.setItem('tb-checks', '');

        this.draw();
    }

    check(value: any, checked: boolean) {
        let index = this.checks.indexOf(value);
        if(index >= 0 && checked) {
            this.checks = this.checks.slice(index, 1);
        }
        else if (index == -1 && checked) {
            this.checks.push(value);
        }
    }

    toggleSelect(row: any) {
        row.selected = !row.selected;
        this.check(row.id, row.selected);
    }

    toggleAll() {
        this.allChecked = !this.allChecked;
        this.table.data.forEach(row => {
            row.selected = this.allChecked;
            this.check(row.id, row.selected);
        });
    }

    addColumn(column: ColumnModel) {
        this.columns.push(column);
    }

    toggleColumn(col: ColumnModel) {
        col.visible = !col.visible;
    }

    isOrdered(col: ColumnModel) {
        return col.order != null;
    }

    isOrderedAsc(col: ColumnModel) {
        return col.order == OrderBy.Asc;
    }

    isOrderedDesc(col: ColumnModel) {
        return col.order == OrderBy.Desc;
    }

    toggleOrder(col: ColumnModel) {
        if(col.orderable) {
            if(this.isOrdered(col)) {
                if(this.isOrderedAsc(col)) col.order = OrderBy.Desc;
                else col.order = OrderBy.Asc;
            }
            else {
                this.columns.forEach(c => c.order = null);
                col.order = OrderBy.Asc;
            }
        }
    }

    pageTo(page: number) {
        this.table.page = page;
        this.draw();
    }

    private preparePagination(data: TableModel) {
        this.pagging = [];

        let last = data.total / data.length;
        let nearests = 2;

        let startRange = Math.max(this.table.page - nearests, 0);
        let lastRange = Math.min(this.table.page + 1 + nearests, last);

        if(startRange > 0) {
            this.pagging.push({ page: 0, label: '1' });
            this.pagging.push({ page: -1, label: '...' });
        }

        for(let i = startRange; i < lastRange; i++)
            this.pagging.push({ page: i, label: `${i+1}` });

        if(last > lastRange) {
            this.pagging.push({ page: -1, label: '...' });
            this.pagging.push({ page: last -1, label: `${last}` });
        }
    }

    draw() {
        if(!this.url) throw new Error('It\'s required a url to draw the table');

        localStorage.setItem('tb-checks', JSON.stringify(this.checks));
        this.http.get<TableModel>(`${this.url}/?page=${this.table.page}&length=${this.table.length}`)
            .toPromise()
            .then(data => {
                this.table = data;
                this.allChecked = false;

                for(let i = this.columns.length; i < this.table.columns.length; i++) {
                    if(!this.columns[i]) this.columns[i] = new ColumnModel();
                    Util.Set(this.columns[i], this.table.columns[i]);
                }

                if(this.checks.length > 0) {
                    for(let i = 0; i < this.table.data.length; i++) {
                        let index = this.checks.indexOf(this.table.data[i].id);
                        this.table.data[i].selected = index >= 0;
                    }
                }

                this.preparePagination(data);
            })
            .catch(e => console.log(e));
    }
}
