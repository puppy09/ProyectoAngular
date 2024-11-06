import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MenuPrincipalComponent } from './components/menu-principal/menu-principal.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {path:'', component: LoginComponent},
    {path: 'menu', component: MenuPrincipalComponent},
    {path: 'registro',component:RegisterComponent}
];
