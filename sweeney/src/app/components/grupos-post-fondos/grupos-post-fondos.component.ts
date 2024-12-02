import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CuentasService } from '../../services/cuentas/cuentas.service';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { GruposMovimientosService } from '../../services/gruposMovimientos/grupos-movimientos.service';
import Swal from 'sweetalert2';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatRadioModule } from '@angular/material/radio';
@Component({
  selector: 'app-grupos-post-fondos',
  standalone: true,
  imports: [ReactiveFormsModule, SidebarComponent, MatRadioModule],
  templateUrl: './grupos-post-fondos.component.html',
  styleUrl: './grupos-post-fondos.component.css'
})
export class GruposPostFondosComponent {
movimientoForm: FormGroup = new FormGroup({});
cuentas: any;
grupo: any;
constructor(private fb: FormBuilder, private cuenSrv: CuentasService, private dataSvc: DataServiceService, private movSrv: GruposMovimientosService){
  this.movimientoForm = this.fb.group({
    no_cuenta: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    monto: new FormControl('', [Validators.required, Validators.min(0)]),
    tipoMovimiento: new FormControl('', Validators.required),
    dia_depo: new FormControl('', Validators.required),
  })

  this.grupo=this.dataSvc.getGrupoData();
}

ngOnInit(){
  this.loadActiveCuentas();
  this.movimientoForm.get('tipoMovimiento')?.valueChanges.subscribe(value=>{
    if(value === 'unica'){
      this.movimientoForm.get('dia_depo')?.disable();
    }
    else{
      this.movimientoForm.get('dia_depo')?.enable();
    }
  });
}

loadActiveCuentas():void{
  this.cuenSrv.getCuentasActivas().subscribe(
    (data)=>{
      this.cuentas=data;
    },(error)=>{
      console.log("Error al cargar las cuentas activas"+ error);
    }
  )
}

submitForm(){
  //if(this.movimientoForm.valid){
  console.log("ENTRO A SUBMIT");
    const formData = this.movimientoForm.value;
    if(formData.tipoMovimiento === 'unica'){
     this.movSrv.postMovimientosGrupales(
        this.grupo.id_grupo, 
        formData.no_cuenta, 
        formData.descripcion, 
        formData.monto
      ).subscribe(
      (data)=>{
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: 'Fondos añadidos al grupo correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      },
      (error)=>{
        console.log("Error al añadir fondos al grupo"+ error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: 'Error al añadir fondos al grupo',
          showConfirmButton: false,
          timer: 1500
        })
      });
    }else{
      this.movSrv.postMovimientosProgramadosGrupales(
        this.grupo.id_grupo, 
        formData.no_cuenta, 
        formData.descripcion, 
        formData.monto,
        formData.dia_depo
      ).subscribe(
        (data)=>{
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: 'Fondos programados al grupo correctamente',
            showConfirmButton: false,
            timer: 1500
          })
        },
        (error)=>{
          console.log("Error al programar fondos al grupo"+ error);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: 'Error al programar fondos al grupo',
            showConfirmButton: false,
            timer: 1500
          })
        }
      );
    }
  //}
}
}
