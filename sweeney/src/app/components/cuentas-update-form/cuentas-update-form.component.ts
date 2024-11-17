import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CuentasService } from '../../services/cuentas/cuentas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { DataServiceService } from '../../services/dataService/data-service.service';

@Component({
  selector: 'app-cuentas-update-form',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, ReactiveFormsModule],
  templateUrl: './cuentas-update-form.component.html',
  styleUrl: './cuentas-update-form.component.css'
})
export class CuentasUpdateFormComponent {
  cuentasForm: FormGroup = new FormGroup({});
  cuenta: any;

  constructor(private fb:FormBuilder, private dataSvc: DataServiceService, private snackBar: MatSnackBar){
    this.cuentasForm = this.fb.group({
      no_cuenta: new FormControl('',[Validators.required, Validators.pattern(/^\d{16}$/)]
      ),
      fecha_venci: new FormControl('', Validators.required),
      alias: new FormControl('', Validators.required),
      addSaldo: new FormControl('', Validators.required),
      saldo: new FormControl({value: '', disabled: true})
    })

    this.cuenta = this.dataSvc.getCuentaData();
    if(this.cuenta){
      this.cuentasForm.patchValue({
        no_cuenta: this.cuenta.no_cuenta,
        fecha_venci: this.cuenta.fecha_venci,
        alias: this.cuenta.nombre,
        saldo: this.cuenta.saldo
      });
    }else{
      console.log("No hay pago");
    }
  }
}
