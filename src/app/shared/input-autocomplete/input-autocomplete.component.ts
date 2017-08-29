import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnInit, forwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject'

import { IDropdown } from '../dropdown/dropdown.interface';
import { DropdownService } from '../dropdown/dropdown.service';

@Component({
    selector: 'input-autocomplete',
    templateUrl: 'input-autocomplete.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputAutompleteComponent),
        multi: true
    }]
})
export class InputAutompleteComponent implements OnInit, IDropdown, ControlValueAccessor {
    @ViewChild('input') input: ElementRef;
    @Output() open: EventEmitter<any> = new EventEmitter();
    @Output() close: EventEmitter<any> = new EventEmitter();

    @Input() url: string;
    @Input() showing: boolean;
    @Input('value') _value: string = '';
    onChange: any = (_: any) => { };
    onTouched: any = () => { };

    results: Observable<string[]>;
    private searchTerms = new Subject<string>();

    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;
        this.input.nativeElement.value = this.value;
        this.onChange(val);
        this.onTouched();
    }

    constructor(
        private element: ElementRef,
        private service: DropdownService,
        private http: HttpClient) { }

    ngOnInit() {
        this.service.register(this);
        this.results = this.searchTerms
            .debounceTime(300)        // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time the term changes
                ? this.getResults(term)
                : Observable.of<string[]>([]))
            .catch(error => {
                console.log(error);
                return Observable.of<string[]>([]);
            });
    }

    writeValue(value: any) {
        if (value) {
            this._value = value;
            this.input.nativeElement.value = value;
        }
    }

    registerOnChange(fn) {
        this.onChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }

    getResults(term: string) {
        return this.http.get<any>(`${this.url}?term=${term}`)
            .map(res => res.data)
    }

    clickOutsideHandler(event: Event) {
        const target = event.target as Element;
        if (target === this.element.nativeElement || !target.closest('input-autocomplete')) {
            this.input.nativeElement.value = this.value;
            this.hide();
        }
    }

    show() {
        this.service.closeAll();
        this.showing = true;
        this.open.emit(null);

        window.document.addEventListener('click', this.clickOutsideHandler.bind(this));
    }

    hide() {
        this.showing = false;
        this.close.emit(null);

        window.document.removeEventListener('click', this.clickOutsideHandler.bind(this));
    }

    toggle(event: Event) {
        event.preventDefault();
        event.stopPropagation();

        if (this.showing) this.hide();
        else this.show();
    }

    select(value: string) {
        this.value = value;
        this.hide();
    }

    search(term: string) {
        this.searchTerms.next(term);
    }
}
