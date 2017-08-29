import { Component, ViewChild, OnInit } from '@angular/core';

import { Sale } from '../../core/sales/sale.model';
import { ConfigService } from '../../core/config.service';
import { SaleService } from '../../core/sales/sale.service';

@Component({
    selector: 'sale-list',
    templateUrl: './sale-list.component.html'
})
export class SaleListComponent {
    url: string;
    selected: Sale;

    constructor(
        private config: ConfigService,
        private saleService: SaleService) {
        this.url = `${this.config.baseUrl}api/sales`;
    }

    formatMoney(number: number) {
        return this.saleService.formatMoney(number);
    }

    openDetails(row: Sale) {
        this.selected = row;
    }

    closeDetails() {
        this.selected = null;
    }

    generateNote(sale: Sale) {
        this.saleService.generateNote(sale);
    }
}
