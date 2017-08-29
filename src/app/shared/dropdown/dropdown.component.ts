import { Component, Input, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { IDropdown } from './dropdown.interface';
import { DropdownService } from './dropdown.service';

@Component({
    selector: 'dropdown',
    templateUrl: 'dropdown.component.html'
})
export class DropdownComponent implements IDropdown, OnInit {
    @Output() open: EventEmitter<any> = new EventEmitter();
    @Output() close: EventEmitter<any> = new EventEmitter();

    @Input() class: string;
    @Input() toggleClass: string;
    @Input() toggleText: string;
    @Input() menuClass: string;
    @Input() showing: boolean;

    constructor(
        private element: ElementRef,
        private sanitizer: DomSanitizer,
        private service: DropdownService) { }

    ngOnInit() {
        this.service.register(this);
    }

    getText() {
        return this.sanitizer.bypassSecurityTrustHtml(this.toggleText);
    }

    clickOutsideHandler(event: Event) {
        const target = event.target as Element;
        if(target === this.element.nativeElement || !target.closest('dropdown'))
            this.hide();
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

        if(this.showing) this.hide();
        else this.show();
    }
}
