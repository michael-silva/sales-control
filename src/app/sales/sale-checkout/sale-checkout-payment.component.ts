import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

import { SaleService } from '../../core/sales/sale.service';
import { Sale, SaleItem, PayementForm, PayementFormDescription } from '../../core/sales/sale.model';

@Component({
    selector: 'sale-checkout-payment',
    templateUrl: './sale-checkout-payment.component.html'
})
export class SaleCheckoutPaymentComponent implements OnInit {
    @ViewChild('paymentForm') paymentForm: ElementRef;
    @Output() confirm: EventEmitter<any> = new EventEmitter();
    @Input() sale: Sale;
    changeAmount: number = 0;
    forms: { value: string; label: string }[] = [];

    constructor(private saleService: SaleService) { }

    ngOnInit() {
        for (const key in PayementForm) {
            if (typeof PayementForm[key] === 'string') {
                this.forms.push({ value: key, label: PayementFormDescription[key] });
            }
        }

        this.paymentForm.nativeElement.focus();
    }

    onConfirm() {
        this.confirm.emit(null);
    }

    formatMoney(number: number) {
        return this.saleService.formatMoney(number);
    }
}
