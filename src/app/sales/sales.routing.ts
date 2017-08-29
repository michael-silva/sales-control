import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesComponent } from './sales.component';
import { SaleCheckoutComponent } from './sale-checkout/sale-checkout.component';
import { SaleListComponent } from './sale-list/sale-list.component';

const ROUTES: Routes = [{
    path: '',
    component: SalesComponent,
    children: [{
        path: '',
        component: SaleCheckoutComponent
    },
    {
        path: 'controle',
        component: SaleListComponent
    }]
}];


@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class SalesRoutingModule { }
