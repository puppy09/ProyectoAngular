import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { CuentasService } from '../services/cuentas/cuentas.service';
@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent  implements OnInit{
  cuentas: any;

  constructor(private cuentasService: CuentasService) {}
  ngOnInit(): void {
    this.fetchCuentas();
  }

  fetchCuentas(): void {
    this.cuentasService.getCuentas().subscribe(
      (data) => {
        this.cuentas = data;
      },
      (error)=>{
        console.error('Error fetching cuentas: ', error);
      })
  }
}
