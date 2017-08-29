import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './errors/not-found/not-found.component';

const ROUTES: Routes = [{
    path: '',
    redirectTo: '/vendas',
    pathMatch: 'full'
},
{
    path: '',
    children: [{
        path: 'produtos',
        loadChildren: 'app/products/products.module#ProductsModule'
    },
    {
        path: 'vendas',
        loadChildren: 'app/sales/sales.module#SalesModule'
    }]
},
{ path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
