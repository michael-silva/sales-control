import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Product } from './product.model';
import { ConfigService } from '../config.service';

@Injectable()
export class ProductService {
    constructor(
        private http: HttpClient,
        private config: ConfigService) { }

    getProduct(id: number): Observable<Product> {
        return this.http.get<any>(`${this.config.baseUrl}api/products/${id}`)
            .map(res => Object.assign(new Product(), res.data));
    }

    searchBrands(term: string): Observable<string[]> {
        return this.http.get<any>(`${this.config.baseUrl}api/products/brands?term=${term}`)
            .map(res => res.data);
    }

    create(product: Product): Observable<Product> {
        return this.http.post<any>(`${this.config.baseUrl}api/products/`, product)
        .map(res => Object.assign(new Product(), res.data));
    }

    update(code: number, product: Product): Observable<Product> {
        return this.http.put<any>(`${this.config.baseUrl}api/products/${code}`, product)
        .map(res => Object.assign(new Product(), res.data));
    }

    saveStock(product: Product): Observable<Product> {
        const data = { stock: product.stock, stockRecommended: product.stockRecommended };
        return this.http.put<any>(`${this.config.baseUrl}api/products/${product.code}/stock`, data)
        .map(res => Object.assign(new Product(), res.data));
    }
}
