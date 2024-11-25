import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CuentasService } from '../../services/cuentas/cuentas.service';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cuentas-form',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, ReactiveFormsModule, MatRadioModule],
  templateUrl: './cuentas-form.component.html',
  styleUrl: './cuentas-form.component.css'
})
export class CuentasFormComponent {

  cuentasForm: FormGroup = new FormGroup({});
  constructor(private router: Router, private cuenSvc: CuentasService){}

  ngOnInit(): void{
    this.cuentasForm = new FormGroup({
      no_cuenta: new FormControl('',[Validators.required, Validators.pattern(/^\d{16}$/)]
      ),
      fecha_venci: new FormControl('', Validators.required),
      alias: new FormControl('', Validators.required),
      addSaldo: new FormControl('', Validators.required),
      saldo: new FormControl({value: '', disabled: true})
    });

    this.cuentasForm.get('addSaldo')?.valueChanges.subscribe(value=>{
        if(value === 'no'){
        this.cuentasForm.get('saldo')?.disable();
      }
      else{
        this.cuentasForm.get('saldo')?.enable();
      }
    });
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
  submitForm(): void{
    if(this.cuentasForm.valid){
      const formData = this.cuentasForm.value;
      if(formData.addSaldo === 'si'){
          this.cuenSvc.postCuentas(
            formData.no_cuenta,
            formData.fecha_venci,
            formData.alias,
            formData.saldo,
            1).subscribe(response =>{
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: 'Cuenta creada exitosamente',
                showConfirmButton: false,
                timer: 1500
              })  
            }, error =>{
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: 'Error creando cuenta',
                showConfirmButton: false,
                timer: 1500
              })
            });
        }else{
      this.cuenSvc.postCuentas(
        formData.no_cuenta,
        formData.fecha_venci,
        formData.alias,
        0,
        1).subscribe(response =>{
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: 'Cuenta creada exitosamente',
            showConfirmButton: false,
            timer: 1500
          })  
        },
          error =>{
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: 'Error creando cuenta',
              showConfirmButton: false,
              timer: 1500
            })
      });
        }
    }else{
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: 'Formulario Invalido',
        showConfirmButton: false,
        timer: 1500
      })
  }
  }
}
