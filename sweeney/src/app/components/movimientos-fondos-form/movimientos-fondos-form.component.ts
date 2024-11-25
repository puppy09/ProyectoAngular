import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CuentasService } from '../../services/cuentas/cuentas.service';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { MatRadioModule } from '@angular/material/radio';
import { MovimientosService } from '../../services/movimientos/movimientos.service';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-movimientos-fondos-form',
  standalone: true,
  imports: [MatRadioModule,ReactiveFormsModule, HeaderComponent, SidebarComponent],
  templateUrl: './movimientos-fondos-form.component.html',
  styleUrl: './movimientos-fondos-form.component.css'
})
export class MovimientosFondosFormComponent {
movimientoForm: FormGroup = new FormGroup({});
cuentas: any;
cuenta: any;

constructor(private router: Router, private movService: MovimientosService, private dataSvc: DataServiceService,  private fb: FormBuilder, private route: Router, private cuenSrv: CuentasService){
  this.movimientoForm = this.fb.group({
    no_cuenta: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    monto: new FormControl('', [Validators.required, Validators.min(0)]),
    tipoMovimiento: new FormControl('', Validators.required),
    diaPago: new FormControl({ value:'', disabled:true}),
  })

  this.cuenta=this.dataSvc.getCuentaData();
  if(this.cuenta){
    this.movimientoForm.patchValue({
      no_cuenta: this.cuenta.no_cuenta
    });
  }
}

ngOnInit(){
  this.loadActiveCuentas();
  this.movimientoForm.get('tipoMovimiento')?.valueChanges.subscribe(value=>{
    if(value === 'unica'){
      this.movimientoForm.get('diaPago')?.disable();
      this.movimientoForm.get('totalPagos')?.disable();
    }
    else{
      this.movimientoForm.get('diaPago')?.enable();
      this.movimientoForm.get('totalPagos')?.enable();
    }
  });
}


  loadActiveCuentas():void{
    this.cuenSrv.getCuentasActivas().subscribe(
      (data)=>{
        this.cuentas=data;
      },(error)=>{
        console.log("Error cargando cuentas");
      });
  }

  submitForm(){
    if(this.movimientoForm.valid){
      const formData = this.movimientoForm.value;
      if(formData.tipoMovimiento==='unica'){
        this.movService.postFondos(
          formData.no_cuenta,
          formData.descripcion,
          formData.monto
        ).subscribe(response=>{
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: 'Fondos añadidos correctamente',
            showConfirmButton: false,
            timer: 1500
          })
              this.router.navigate(['/cuentas']);
          }, error=>{
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: 'Error añadiendo fondos',
              showConfirmButton: false,
              timer: 1500
              })
            });
      }
      else{
        this.movService.postFondosProgramados(
            formData.no_cuenta,
            formData.descripcion,
            formData.monto,
            formData.diaPago
        ).subscribe(response=>{
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: 'Fondos programados correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/cuentas']);
        }, error=>{
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: 'Error programando fondos',
            showConfirmButton: false,
            timer: 1500
          });
        })}
    }}}
