import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService } from './layout.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './app-navbar.component.html'
})
export class AppNavbarComponent implements OnInit {
    @Input() visible: boolean = true;

    constructor(
        private router: Router,
        private layoutService: LayoutService) { }

    ngOnInit() {
        this.layoutService.navbarVisible
            .subscribe(visible => this.visible = visible);
    }
}
