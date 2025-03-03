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
import { CrearGrupoModalComponent } from './components/crear-grupo-modal/crear-grupo-modal.component';
import { GrupoMainComponent } from './components/grupo-main/grupo-main.component';
import { GruposSinglePagosComponent } from './components/grupos-single-pagos/grupos-single-pagos.component';
import { GruposSingleMovimientosComponent } from './components/grupos-single-movimientos/grupos-single-movimientos.component';
import { GruposSinglePagosProgramadosComponent } from './components/grupos-single-pagos-programados/grupos-single-pagos-programados.component';
import { GruposPostPagosComponent } from './components/grupos-post-pagos/grupos-post-pagos.component';
import { GruposPostFondosComponent } from './components/grupos-post-fondos/grupos-post-fondos.component';
import { GruposSingleMovimientosProgramadosComponent } from './components/grupos-single-movimientos-programados/grupos-single-movimientos-programados.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { RecuperarContraComponent } from './components/recuperar-contra/recuperar-contra.component';
import { GruposFormMovProComponent } from './components/grupos-form-mov-pro/grupos-form-mov-pro.component';
import { GruposFormPagoProComponent } from './components/grupos-form-pago-pro/grupos-form-pago-pro.component';
import { GruposFormPagoComponent } from './components/grupos-form-pago/grupos-form-pago.component';
import { GraficasComponent } from './components/graficas/graficas.component';
import { GruposGastosComponent } from './components/grupos-gastos/grupos-gastos.component';
import { GruposGastosFormComponent } from './components/grupos-gastos-form/grupos-gastos-form.component';

export const routes: Routes = [
    {path:'', component: LoginComponent},
    {path: 'recuperar/contra', component: RecuperarContraComponent},
    {path: 'configuracion', component: ConfiguracionComponent},
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
    {path: 'grupos',component:GruposComponent,
        children:[
            {
                path: 'crear/grupo',
                component: CrearGrupoModalComponent
            }
        ]
    },
    {path: 'grupos/main', component: GrupoMainComponent,
        children:[
            {
                path:'single/pagos',
                component: GruposSinglePagosComponent
            },
            {
                path:'single/movimientos',
                component: GruposSingleMovimientosComponent
            },
            {
                path:'single/pagos/programados',
                component: GruposSinglePagosProgramadosComponent
            },{
                path:'single/movimientos/programados',
                component: GruposSingleMovimientosProgramadosComponent
            }
        ]
    },
    {path: 'grupos/pagos/agregar', component: GruposPostPagosComponent},
    {path: 'grupos/movimientos/agregar', component: GruposPostFondosComponent},
    {path: 'grupos/movimientos/programados/modificar/:id', component: GruposFormMovProComponent},
    {path: 'grupos/pagos/programados/modificar/:id', component: GruposFormPagoProComponent},
    {path: 'grupos/pagos/modificar/:id', component: GruposFormPagoComponent},
    {path: 'grupos/categorias/agregar', component: GruposGastosFormComponent},
    {path: 'gastos',component:GastosComponent},
    {path: 'grupos/gastos',component:GruposGastosComponent},
    {path: 'gastos/agregar', component: GastosFormComponent},
    {path: 'pagos/modificar/:id', component: PagosUpdateFormComponent},
    {path: 'pagos/programados/modificar/:id',component:PagosProUpdFormComponent},
    {path: 'cuentas/agregar', component:CuentasFormComponent},
    {path: 'cuentas/modificar/:id', component:CuentasUpdateFormComponent},
    {path: 'graficas', component: GraficasComponent},
    {path: 'page404', component:Page404Component},
    {
        path: '**', redirectTo: 'page404'
    }
];