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
import { CuentasFormComponent } from './components/cuentas-form/cuentas-form.component';
import { CuentasUpdateFormComponent } from './components/cuentas-update-form/cuentas-update-form.component';
import { MovimientosFondosFormComponent } from './components/movimientos-fondos-form/movimientos-fondos-form.component';
import { GastosFormComponent } from './components/gastos-form/gastos-form.component';
import { PagosProUpdFormComponent } from './components/pagos-pro-upd-form/pagos-pro-upd-form.component';
import { MovProUpdFormComponent } from './components/mov-pro-upd-form/mov-pro-upd-form.component';
import { SingleMovimientosProgramadosComponent } from './components/single-movimientos-programados/single-movimientos-programados.component';

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
            },
            {
                path: 'single/movimientosProgramados',
                component: SingleMovimientosProgramadosComponent
            }
        ]
    },
    {path: 'movimientos/agregar',component:MovimientosFormComponent},
    {path: 'movimientos/fondos/añadir', component:MovimientosFondosFormComponent},
    {path: 'movimientos/fondos/añadir/:id', component:MovimientosFondosFormComponent},
    {path: 'movimientos/programados/modificar/:id',component:MovProUpdFormComponent},
    {path: 'grupos',component:GruposComponent},
    {path: 'gastos',component:GastosComponent},
    {path: 'gastos/agregar', component:GastosFormComponent},
    {path: 'pagos/modificar/:id', component: PagosUpdateFormComponent},
    {path: 'pagos/programados/modificar/:id',component:PagosProUpdFormComponent},
    {path: 'cuentas/agregar', component:CuentasFormComponent},
    {path: 'cuentas/modificar/:id', component:CuentasUpdateFormComponent},
    {path: 'page404', component:Page404Component},
    {
        path: '**', redirectTo: 'page404'
    }
];