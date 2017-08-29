import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { IDropdown } from './dropdown.interface';

@Injectable()
export class DropdownService {
    private dropdowns: IDropdown[] = [];
    constructor() { }

    register(dropdown: IDropdown) {
        this.dropdowns.push(dropdown);
    }

    closeAll() {
        this.dropdowns.forEach(dropdown => {
            if(dropdown.showing) dropdown.hide();
        });
    }
}
