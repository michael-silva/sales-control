import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

import { Product } from '../../core/products/product.model';
import { ProductService } from '../../core/products/product.service';

@Component({
    selector: 'product-stock',
    templateUrl: './product-stock.component.html'
})
export class ProductStockComponent implements OnInit, OnDestroy {
    @Output() save: EventEmitter<void> = new EventEmitter();

    @Input() postChanges: boolean;

    @Input()
    set product(product: Product) {
        this._product = product;
        this.currentStock = this.product.stock;
    }
    get product(): Product {
        return this._product;
    }

    _product: Product;
    currentStock: number = 0;
    error: string;

    constructor(private service: ProductService) {}

    ngOnInit() { }

    ngOnDestroy() {
        if(this.hasChanges())
            this.product.stock = this.currentStock;
    }

    hasChanges() {
        return this.product.stock !== this.currentStock;
    }

    diffValue() {
        return Math.abs(this.product.stock - this.currentStock);
    }

    increaseRecommendedStock() {
        this.product.stockRecommended++;
    }
    decreaseRecommendedStock() {
        this.product.stockRecommended--;
    }

    increaseStock() {
        this.product.stock++;
    }
    decreaseStock() {
        this.product.stock--;
    }

    hasWarning() {
        return Product.warning(this.product.stock, this.product.stockRecommended);
    }
    hasDanger() {
        return Product.danger(this.product.stock, this.product.stockRecommended);
    }

    saveChanges() {
        if(!this.postChanges) {
            this.currentStock = this.product.stock;
            this.save.emit(null);
            return;
        }
        this.service.saveStock(this.product)
            .subscribe(
                data => {
                    this.currentStock = this.product.stock;
                    this.save.emit(null);
                },
                err => this.error = 'Tivemos um problema ao tentar salvar.'
            );
    }
}
