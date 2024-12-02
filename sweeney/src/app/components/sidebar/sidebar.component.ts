import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import {ButtonModule} from "primeng/button";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faHouse} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
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
  constructor(private router:Router, private authSvc: AuthService){}
  
  cerrarSesion(): void{
    try {
      this.authSvc.logout();
      this.router.navigate(['']);
      
    } catch (error) {
      Swal.fire({
        position: "top-end",
          icon: "error",
          title: 'Error cerrando sesión',
          showConfirmButton: false,
          timer: 1500
      })
    }
  }
  goToMovimientos(){
    this.router.navigate(['/movimientos/single/movimientos']);
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
  goToConfiguracion(){
    this.router.navigate(['/configuracion']);
  }
  goToGraficas(){
    this.router.navigate(['/graficas']);
  }
  goToGraficas2(){
    this.router.navigate(['/graficas2']);
  }

}

