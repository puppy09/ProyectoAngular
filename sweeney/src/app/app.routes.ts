import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MenuPrincipalComponent } from './components/menu-principal/menu-principal.component';
import { RegisterComponent } from './components/register/register.component';
import { CuentasComponent } from './components/cuentas/cuentas.component';
import { MovimientosComponent } from './components/movimientos/movimientos.component';
import { GruposComponent } from './components/grupos/grupos.component';
import { GastosComponent } from './components/gastos/gastos.component';
import { Page404Component } from './components/page404/page404.component';
import { MovimientosFormComponent } from './components/movimientos-form/movimientos-form.component';
import { PagosUpdateFormComponent } from './components/pagosUpdateForm/pagos-update-form/pagos-update-form.component';
import { SingleMovimientosComponent } from './components/single-movimientos/single-movimientos.component';
import { SinglePagosComponent } from './components/single-pagos/single-pagos.component';
import { SinglePagosProgramadosComponent } from './components/single-pagos-programados/single-pagos-programados.component';

export const routes: Routes = [
    {path:'', component: LoginComponent},
    {path: 'menu', component: MenuPrincipalComponent},
    {path: 'registro',component:RegisterComponent},
    {path: 'cuentas', component: CuentasComponent},
    {path: 'movimientos',component:MovimientosComponent,
        children:[
            {
                path: 'single/movimientos',
                component: SingleMovimientosComponent
            },
            {
                path: 'single/pagos',
                component: SinglePagosComponent
            },
            {
                path: 'single/pagosProgramados',
                component: SinglePagosProgramadosComponent
            }
        ]
    },
    {path: 'movimientos/agregar',component:MovimientosFormComponent},
    {path: 'grupos',component:GruposComponent},
    {path: 'gastos',component:GastosComponent},
    {path: 'pagos/modificar/:id', component: PagosUpdateFormComponent},
    {path: 'page404', component:Page404Component},
    {
        path: '**', redirectTo: 'page404'
    }
];