import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';

import { ProductService } from '../../core/products/product.service';
import { SaleService } from '../../core/sales/sale.service';
import { Product } from '../../core/products/product.model';
import { Sale, SaleItem } from '../../core/sales/sale.model';

import { SaleCheckoutDiscountComponent } from './sale-checkout-discount.component';
import { LayoutService } from '../../core/layout.service';

@Component({
    selector: 'sale-checkout',
    templateUrl: './sale-checkout.component.html'
})
export class SaleCheckoutComponent implements OnInit, OnDestroy {
    @ViewChild('input') inputBarcode: ElementRef;
    @ViewChild('checkoutDiscount') discountComponent: SaleCheckoutDiscountComponent;
    barcode: number;
    quantity: number = 1;
    sale: Sale = new Sale();
    errorMessage: string = '';
    modalDiscount: boolean;
    modalPaymentForm: boolean;

    constructor(
        private productService: ProductService,
        private saleService: SaleService,
        private layoutService: LayoutService) { }

    ngOnInit() {
        this.layoutService.hideNavbar();
        window.document.addEventListener('keydown', this.keydownHandler.bind(this));
    }
    ngOnDestroy() {
        this.layoutService.showNavbar();
        window.document.removeEventListener('keydown', this.keydownHandler.bind(this));
    }

    formatMoney(number: number) {
        return this.saleService.formatMoney(number);
    }

    keydownHandler(e: KeyboardEvent) {
        if (this.modalDiscount || this.modalPaymentForm) return;
        this.inputBarcode.nativeElement.focus();
    }

    enterPressed() {
        if(this.barcode === null || this.barcode === undefined || this.barcode.toString().trim() === '')
            return;

        const barcode = +this.barcode;
        if (barcode === 0) {
            this.openDiscountModal();
        }
        else if (barcode <= 9999) {
            this.quantity = barcode;
            this.barcode = null;
        }
        else {
            this.productService.getProduct(barcode)
                .subscribe((product: Product) => {
                    if (product) {
                        this.addLine(product);
                    }
                    else {
                        this.setError('Produto não encontrado, verifique se o código esta correto.');
                    }
                },
                err => {
                    this.setError('Não foi possivel se conectar ao servidor, verifique sua conexão com a internet.');
                });
        }
    }

    escPressed() {
        this.clearCurrent();
    }

    backspacePressed() {
        if (!this.barcode)
            this.sale.items.pop();
    }

    keypressHandler(e: KeyboardEvent) {
        if (e.keyCode === 13) {
            if (e.altKey) this.openPaymentFormModal();
            else this.enterPressed();
        }
        else if (e.keyCode === 27) {
            this.escPressed();
        }
        else if (e.keyCode === 8) {
            this.backspacePressed();
        }
        else if (!e.ctrlKey && !e.altKey && (e.keyCode >= 69 && e.keyCode <= 90 || e.keyCode >= 106)) {
            e.preventDefault();
        }
    }

    clearCurrent() {
        this.quantity = 1;
        this.barcode = null;
        this.errorMessage = '';
    }

    addLine(product: Product) {
        const existing = this.sale.items.find(p => p.product.code === product.code);
        if (existing) {
            if (existing.product.stock < existing.amount + this.quantity)
                return this.setError('Não existem produtos suficientes em estoque para esta compra.');

            existing.amount += this.quantity;
        }
        else {
            if (product.stock < this.quantity)
                return this.setError('Não existem produtos suficientes em estoque para esta compra.');

            const line = new SaleItem();
            line.amount = this.quantity;
            line.product = product;
            this.sale.items.push(line);
            setTimeout(() => {
                const elem = document.querySelector('.scroll-content');
                elem.scrollTop = elem.scrollHeight;
            }, 100)
        }

        this.clearCurrent();
    }

    removeLine(index: number) {
        this.sale.items.splice(index, 1);
    }

    setError(msg: string) {
        this.errorMessage = msg;
    }

    getTotal() {
        return this.formatMoney(this.sale.sumTotal());
    }

    showStock(line: SaleItem) {
        return line.product.stock - line.amount >= 0;
    }

    hasDanger(line: SaleItem) {
        return Product.danger(line.product.stock - line.amount, line.product.stockRecommended);
    }

    hasWarning(line: SaleItem) {
        return Product.warning(line.product.stock - line.amount, line.product.stockRecommended);
    }

    openDiscountModal() {
        this.clearCurrent();
        this.modalDiscount = true;
    }

    closeDiscountModal() {
        this.modalDiscount = false;
    }

    openPaymentFormModal() {
        this.modalPaymentForm = true;
    }

    closePaymentFormModal() {
        this.modalPaymentForm = false;
    }

    applyDiscount() {
        this.discountComponent.applyDiscount();
    }

    fillChars(n: number, c: string) {
        Array(n).fill(c);
    }

    finishSale() {
        this.saleService.saveSale(this.sale)
            .subscribe(sale => {
                this.saleService.generateAndPrintNote(sale);
            })
    }
}
