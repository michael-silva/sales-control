import { TableColumn } from './column.model';

export class TableSearch {
    term: string;
    pattern: string;
}

export class TableModel {
    search: TableSearch;
    selectable: boolean;
    page: number = 0;
    length: number = 10;
    total: number;
    totalFiltered: number;
    columns: TableColumn[];
    data: Array<any>;

    constructor() {

    }
}

export class TablePage {
    page: number;
    label: string;
}