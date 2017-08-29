import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject'

import { Product, UnitOfMeasurement, UnitOfMeasurementDescription } from '../../core/products/product.model';
import { ProductService } from '../../core/products/product.service';

import { ProductStockComponent } from '../product-stock/product-stock.component';
import { ConfigService } from '../../core/config.service'

@Component({
    selector: 'product-form',
    templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
    _states: string[];
    @ViewChild('prdstock') stockComponent: ProductStockComponent;
    units: { value: string; label: string }[] = [];
    title: string;
    product: Product;
    productForm: FormGroup;
    formErrors: string[];
    modalSuccess: boolean;
    modalError: boolean;
    modalStock: boolean;

    brandResults: Observable<string[]>;
    private searchTerms = new Subject<string>();
    urlBrand: string;

    constructor(
        private config: ConfigService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private service: ProductService
    ) {
        this.product = new Product();
        this.formErrors = [];
        this._states = [];
        this.urlBrand = `${this.config.baseUrl}api/products/brands`;
    }

    ngOnInit() {

        this.createForm();
        this._states.push('new');
        this.route.paramMap
            .subscribe((params: ParamMap) => {
                if (!params.has('id')) return;
                this.service.getProduct(+params.get('id'))
                    .subscribe((product: Product) => {
                        if (product) {
                            this.product = product;
                            this._states.pop();
                            this._states.push('editing');
                            this.createForm();
                        }
                    })
            });

        this.brandResults = this.searchTerms
            .debounceTime(300)        // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time the term changes
                ? this.service.searchBrands(term)
                : Observable.of<string[]>([]))
            .catch(error => {
                console.log(error);
                return Observable.of<string[]>([]);
            });

        for (const key in UnitOfMeasurement) {
            if (typeof UnitOfMeasurement[key] === 'string') {
                this.units.push({ value: key, label: UnitOfMeasurementDescription[key] });
            }
        }
    }

    is(state: string) {
        return this._states.indexOf(state) >= 0;
    }

    createForm() {
        this.productForm = this.fb.group({
            'code': [this.product.code, Validators.required],
            'name': [this.product.name, Validators.required],
            'unitOfMeasurement': [this.product.unitOfMeasurement, Validators.required],
            'brand': [this.product.brand,Validators.required],
            'unitValue': [this.product.unitValue, Validators.required],
        });
    }

    showError(controlName: string) {
        const control = this.productForm.controls[controlName];
        return control.invalid && control.touched;
    }

    showSummary() {
        return this.formErrors.length > 0;
    }

    submitForm(model: Product) {
        this.formErrors = [];

        this._states.push('loading');
        const code = this.product.code;
        Object.assign(this.product, model);
        const promise = (this.is('new') ? this.service.create(this.product) : this.service.update(code, this.product))
            .subscribe(
            data => {
                this.product = data;
                this.modalSuccess = true;
            },
            err => this.modalError = true,
            () => this._states.pop()
            );
    }

    closeSuccess() {
        this.modalSuccess = false;
    }

    closeError() {
        this.modalError = false;
    }

    openStock(model: Product) {
        this.product.unitOfMeasurement = model.unitOfMeasurement;
        this.modalStock = true;
    }

    closeStock() {
        this.modalStock = false;
    }

    saveStock() {
        this.stockComponent.saveChanges();
    }

    searchBrands(value: string) {
        this.searchTerms.next(value)
    }
}
