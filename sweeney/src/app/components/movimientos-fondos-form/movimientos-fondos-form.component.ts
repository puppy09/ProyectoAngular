import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CuentasService } from '../../services/cuentas/cuentas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { MatRadioModule } from '@angular/material/radio';
import { MovimientosService } from '../../services/movimientos/movimientos.service';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
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

constructor(private router: Router, private movService: MovimientosService, private snackBar: MatSnackBar,  private dataSvc: DataServiceService,  private fb: FormBuilder, private route: Router, private cuenSrv: CuentasService){
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
              this.snackBar.open('Movimiento Registrado con éxito', 'Cerrar',{
              duration: 5000
              })
              this.router.navigate(['/cuentas']);
          }, error=>{
              const errorMessage = error.error?.message || 'Error al programar ingreso';
              this.snackBar.open('Error programando pago'+errorMessage, 'Cerrar',{
              duration: 5000
              });
            })}
      else{
        this.movService.postFondosProgramados(
            formData.no_cuenta,
            formData.descripcion,
            formData.monto,
            formData.diaPago
        ).subscribe(response=>{
            this.snackBar.open('Movimiento Registrado con éxito', 'Cerrar',{
              duration: 5000
          })
          this.router.navigate(['/cuentas']);
        }, error=>{
            const errorMessage = error.error?.message || 'Error al programar ingresp';
            this.snackBar.open('Error programando pago'+errorMessage, 'Cerrar',{
            duration: 5000
          });
        })}
    }}}
