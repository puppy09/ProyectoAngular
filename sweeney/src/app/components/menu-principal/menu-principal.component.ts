import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { CuentasService } from '../../services/cuentas/cuentas.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Cuenta{
  ID: number;
  no_cuenta: string;
  fecha_vencimiento: string;
  saldo: number;
  nombre: string;
  id_usuario: number;
  estatus: number;
  estatusDetail: {
    estatus: string;
  };
}
@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent  implements OnInit{
  cuentas: any;

  constructor(private cuentasService: CuentasService, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.fetchCuentas();
  }

  fetchCuentas(): void {
    this.cuentasService.getCuentas().subscribe(
      (data) => {
        this.cuentas = data;
      },
      (error)=>{
        const errorMessage = error.error?.message || 'Error al obtener cuentas';
        this.snackBar.open('Error al registrar el usuario: '+errorMessage, 'Cerrar',{
          duration: 5000
        })
        console.error('Error fetching cuentas: ', error);
      })
  }
}
