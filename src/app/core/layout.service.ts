import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject'

@Injectable()
export class LayoutService {

    navbarVisible: Observable<boolean>;
    private _navbarShown = new Subject<boolean>();

    constructor() {
        this.navbarVisible = this._navbarShown;
    }

    showNavbar() {
        this._navbarShown.next(true);
    }

    hideNavbar() {
        this._navbarShown.next(false);
    }
}
