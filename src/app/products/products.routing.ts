import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';

const ROUTES: Routes = [{
    path: '',
    component: ProductsComponent,
    children: [{
        path: '',
        component: ProductListComponent
    },
    {
        path: 'novo',
        component: ProductFormComponent
    },
    {
        path: ':id',
        component: ProductFormComponent
    }]
}];


@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }
