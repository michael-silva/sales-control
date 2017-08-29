import { Component, ViewChild, OnInit } from '@angular/core';

import { ProductStockComponent } from '../product-stock/product-stock.component';
import { Product } from '../../core/products/product.model';
import { ConfigService } from '../../core/config.service';

@Component({
    selector: 'product-list',
    templateUrl: './product-list.component.html'
})
export class ProductListComponent {
    @ViewChild('prdstock') stockComponent: ProductStockComponent;
    url: string;
    editing: Product;

    constructor(private config: ConfigService) {
        this.url = `${this.config.baseUrl}api/products`;
    }

    openStock(row: Product) {
        this.editing = row;
    }

    clearEditing() {
        this.editing = null;
    }

    saveStock() {
        this.stockComponent.saveChanges();
    }
}
