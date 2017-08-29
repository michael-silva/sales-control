import { Component, Input, Output, ViewChild, ElementRef, OnInit, EventEmitter } from '@angular/core';

import { SaleService } from '../../core/sales/sale.service';
import { Sale, SaleItem } from '../../core/sales/sale.model';

@Component({
    selector: 'sale-checkout-discount',
    templateUrl: './sale-checkout-discount.component.html'
})
export class SaleCheckoutDiscountComponent implements OnInit {
    @ViewChild('discountInput') discountInput: ElementRef;
    @Input() sale: Sale;
    @Output() confirm: EventEmitter<any> = new EventEmitter();
    discount: number;

    constructor(private saleService: SaleService) { }

    ngOnInit() {
        this.discountInput.nativeElement.focus();
    }

    onConfirm() {
        this.confirm.emit(null);
    }

    applyDiscount() {
        this.sale.discount = this.discount;
    }

    percentDiscount() {
        if(!this.discount) return 100;
        return (100 * this.discount / this.sale.sumTotal()).toFixed(2);
    }

    total() {
        return this.saleService.formatMoney(this.sale.sumTotal() - (this.discount || 0));
    }
}
