import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
    selector: 'modal',
    templateUrl: 'modal.component.html'
})
export class ModalComponent implements OnInit {
    @Output() open: EventEmitter<any> = new EventEmitter();
    @Output() close: EventEmitter<any> = new EventEmitter();

    @Input() title: string;
    @Input() showing: boolean;

    constructor() { }

    ngOnInit() {
    }

    keyupHandler(e: KeyboardEvent) {
        if(e.keyCode === 27) {
            this.hide();
        }
    }

    show() {
        this.showing = true;
        this.open.emit(null);
    }

    hide() {
        this.showing = false;
        this.close.emit(null);
    }
}
