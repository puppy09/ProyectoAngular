import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MenuPrincipalComponent } from './components/menu-principal/menu-principal.component';
import { RegisterComponent } from './components/register/register.component';
import { CuentasComponent } from './components/cuentas/cuentas.component';
import { MovimientosComponent } from './components/movimientos/movimientos.component';
import { GruposComponent } from './components/grupos/grupos.component';
import { GastosComponent } from './components/gastos/gastos.component';
import { Page404Component } from './components/page404/page404.component';

export const routes: Routes = [
    {path:'', component: LoginComponent},
    {path: 'menu', component: MenuPrincipalComponent},
    {path: 'registro',component:RegisterComponent},
    {path: 'cuentas', component: CuentasComponent},
    {path: 'movimientos',component:MovimientosComponent},
    {path: 'grupos',component:GruposComponent},
    {path: 'gastos',component:GastosComponent},
    {path: 'page404', component:Page404Component},
    {
        path: '**', redirectTo: 'page404'
    }
];
