import { Component } from '@angular/core';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { gruposMovimientos } from '../../interfaces/gruposPagos.interface';
import { GruposMovimientosService } from '../../services/gruposMovimientos/grupos-movimientos.service';
import Swal from 'sweetalert2';
import { SidebarComponent } from '../sidebar/sidebar.component';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-grupos-form-mov-pro',
  standalone: true,
  imports: [SidebarComponent,ReactiveFormsModule],
  templateUrl: './grupos-form-mov-pro.component.html',
  styleUrl: './grupos-form-mov-pro.component.css'
})
export class GruposFormMovProComponent {

  movimientoProForm:FormGroup = new FormGroup({});
  movimientoPro: any;
  constructor(private router: Router, private dataSvc: DataServiceService, private movProSvc: GruposMovimientosService, private fb: FormBuilder){
    this.movimientoProForm = this.fb.group({
      no_cuenta: new FormControl({value:'', disabled: true},[Validators.required, Validators.pattern(/^\d{16}$/)]),
      descripcion: new FormControl('', Validators.required),
      monto: new FormControl('', Validators.required),
      dia: new FormControl('', Validators.required),
    })

    this.movimientoPro=dataSvc.getMovProGrupalData();
    if(this.movimientoPro){
      console.log(this.movimientoPro);
      this.movimientoProForm.patchValue({
        no_cuenta: this.movimientoPro.no_cuenta,
        descripcion: this.movimientoPro.descripcion,
        monto: this.movimientoPro.monto,
        dia: this.movimientoPro.dia
      });
    }
  }
  cancel(){
    this.router.navigate(['/grupos/main']);
  }
  submitForm(movProId: string){
    const formData = this.movimientoProForm.value;
    this.movProSvc.updMovimientoProgramado(
      movProId,
      formData.no_cuenta,
      formData.descripcion,
      formData.monto,
      formData.dia,
    ).subscribe(response=>{
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: 'Movimiento actualizado con exito',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/grupos/main']);
    }, error=>{
        const errorMessage = error.error?.message || 'Error al actualizar cuenta';
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: errorMessage,
          showConfirmButton: false,
          timer: 1500
        })}
    )
  }
}
