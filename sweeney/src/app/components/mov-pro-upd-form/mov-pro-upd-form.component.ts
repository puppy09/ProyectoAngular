import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { MovimientosProgService } from '../../services/movimientosProg/movimientos-prog.service';
import { ReactiveFormsModule, FormControl, FormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mov-pro-upd-form',
  standalone: true,
  imports: [SidebarComponent, ReactiveFormsModule],
  templateUrl: './mov-pro-upd-form.component.html',
  styleUrl: './mov-pro-upd-form.component.css'
})
export class MovProUpdFormComponent {

  movimientoProForm:FormGroup = new FormGroup({});
  movimientoPro: any;

  constructor(private dataSvc: DataServiceService, private movProSvc: MovimientosProgService, private fb: FormBuilder, private router: Router){
    this.movimientoProForm = this.fb.group({
      no_cuenta: new FormControl({value:'', disabled: true},[Validators.required, Validators.pattern(/^\d{16}$/)]),
      descripcion: new FormControl('', Validators.required),
      monto: new FormControl('', Validators.required),
      dia: new FormControl('', Validators.required),
    })

    this.movimientoPro=dataSvc.getmovProData();
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
  cancelar(){
    this.router.navigate(['/movimientos/single/movimientosProgramados']);
  }
  submitForm(movProId: number){
    const formData = this.movimientoProForm.value;
    this.movProSvc.updateMovProg(
      movProId,
      formData.no_cuenta,
      formData.monto,
      formData.dia,
      formData.descripcion
    ).subscribe(response=>{
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: 'Movimiento actualizado con exito',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/movimientos/single/movimientosProgramados']);
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
