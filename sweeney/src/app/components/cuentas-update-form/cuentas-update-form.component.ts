import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CuentasService } from '../../services/cuentas/cuentas.service';
import { MatRadioModule } from '@angular/material/radio';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuentas-update-form',
  standalone: true,
  imports: [SidebarComponent, ReactiveFormsModule],
  templateUrl: './cuentas-update-form.component.html',
  styleUrl: './cuentas-update-form.component.css'
})
export class CuentasUpdateFormComponent {
  cuentasForm: FormGroup = new FormGroup({});
  cuenta: any;

  constructor(private router:Router, private cuentaSvc: CuentasService,  private fb:FormBuilder, private dataSvc: DataServiceService){
    this.cuentasForm = this.fb.group({
      no_cuenta: new FormControl({value:'', disabled: true},[Validators.required, Validators.pattern(/^\d{16}$/)]),
      fecha_venci: new FormControl('', Validators.required),
      alias: new FormControl('', Validators.required),
      addSaldo: new FormControl('', Validators.required),
      saldo: new FormControl({value:'', disabled:true}, [Validators.required])
    })

    this.cuenta = this.dataSvc.getCuentaData();
    if(this.cuenta){
      console.log(this.cuenta);
      this.cuentasForm.patchValue({
        no_cuenta: this.cuenta.no_cuenta,
        fecha_venci: this.cuenta.fecha_vencimiento,
        alias: this.cuenta.nombre,
        saldo: this.cuenta.saldo
      });
    }
  }

  formatFechaVencimiento(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove all non-digit characters
    if (value.length >= 3) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4); // Insert '/'
    }
    input.value = value; // Update the input value
    this.cuentasForm.get('fecha_venci')?.setValue(value); // Sync with form control
  }

  cancel(){
    this.router.navigate(['/cuentas']);
  }
  submitForm(cuentaId:number){
    if(this.cuentasForm.valid){
      const formData=this.cuentasForm.value;
      this.cuentaSvc.updCuenta(
        cuentaId,
        formData.fecha_venci,
        formData.alias,
        formData.saldo
      ).subscribe(response=>{
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: 'Cuenta actualizada exitosamente',
          showConfirmButton: false,
          timer: 1500
        })
        }, error=>{
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: 'Error actualizando cuenta',
            showConfirmButton: false,
            timer: 1500
          })
        }
      )
    }
    else{
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: 'Formulario invalido',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
}
