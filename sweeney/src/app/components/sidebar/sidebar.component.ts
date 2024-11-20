import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import {ButtonModule} from "primeng/button";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faHouse} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarModule, ButtonModule, FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  faHouse = faHouse;
  sidebarVisible: boolean = true;
  constructor(private router:Router, private authSvc: AuthService, private snackBar: MatSnackBar){}
  
  cerrarSesion(): void{
    try {
      this.authSvc.logout();
      this.router.navigate(['']);
      
    } catch (error) {
      this.snackBar.open('Error cerrando sesión', 'Cerrar', {
        duration: 5000,
      });
    }
  }
  goToMovimientos(){
    this.router.navigate(['/movimientos']);
  }

  goToCuentas(){
    this.router.navigate(['/cuentas']);
  }

  goToGrupos(){
    this.router.navigate(['/grupos']);
  }

  goToGastos(){
    this.router.navigate(['/gastos']);
  }
  goToMenu(){
    this.router.navigate(['/menu']);
  }
  
}

