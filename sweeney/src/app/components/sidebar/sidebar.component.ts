import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import {ButtonModule} from "primeng/button";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarModule, ButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  sidebarVisible: boolean = true;
  constructor(private router:Router){}
  
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
}

