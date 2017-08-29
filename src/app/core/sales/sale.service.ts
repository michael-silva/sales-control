import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Sale } from './sale.model';
import { ConfigService } from '../config.service';

@Injectable()
export class SaleService {
    constructor(
        private http: HttpClient,
        private config: ConfigService) { }

    formatMoney(number: number) {
        return "R$ " + number.toFixed(2).toString().replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');;
    }

    getSale(id: number): Observable<Sale> {
        return this.http.get<any>(`${this.config.baseUrl}api/sales/${id}`)
            .map(res => Object.assign(new Sale(), res.data));
    }

    saveSale(sale: Sale): Observable<Sale> {
        return this.http.post<any>(`${this.config.baseUrl}api/sales/`, sale)
            .map(res => Object.assign(new Sale(), res.data));
    }

    generateNote(sale: Sale, print?: boolean) {
        const lineLength = 50;
        const emptyLine = Array(lineLength).fill('-').join('');
        const spacesAfterId = Array(lineLength - (sale.id.toString().length + 19)).fill('&nbsp;').join('');
        let items = '';
        for (const i in sale.items) {
            const item = sale.items[i];
            const unitValue = this.formatMoney(item.product.unitValue);
            const total = this.formatMoney(item.product.unitValue * item.amount);
            const dots = Array(lineLength - (item.product.name.length + 6 + unitValue.length + item.amount.toString().length + total.length)).fill('.').join('');
            items += `${item.product.name}${dots}${item.product.unitValue} x ${item.amount} = ${total}<br>`;
        }
        var popupWin = window.open('', '_blank', 'width=512,height=512');
        popupWin.document.open();
        popupWin.document.write(`<html>
            <head>
                <style>body { font-family: 'Courier' }</style>
            </head>
            <body>
                TESTE DE NOTA<br>
                RUA TESTE DE NOTA, 1009<br>
                ${emptyLine}<br>
                <strong>ID</strong>: ${sale.id}${spacesAfterId}<strong>Data</strong>: ${sale.dateString}<br>
                ${emptyLine}<br>
                ${items}
                <strong>Total</strong> R$ ${sale.total}<br>
                ${emptyLine}<br>
                Obrigado pela preferência.<br>
            </body>
        </html>`);
        if(print) {
            popupWin.print();
            popupWin.close();
        }
    }

    generateAndPrintNote(sale: Sale) {
        this.generateNote(sale, true);
    }
}
