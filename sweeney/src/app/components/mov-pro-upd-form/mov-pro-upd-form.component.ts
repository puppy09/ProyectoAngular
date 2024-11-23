import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { MovimientosProgService } from '../../services/movimientosProg/movimientos-prog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormControl, FormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-mov-pro-upd-form',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, ReactiveFormsModule],
  templateUrl: './mov-pro-upd-form.component.html',
  styleUrl: './mov-pro-upd-form.component.css'
})
export class MovProUpdFormComponent {

  movimientoProForm:FormGroup = new FormGroup({});
  movimientoPro: any;

  constructor(private dataSvc: DataServiceService, private movProSvc: MovimientosProgService, private fb: FormBuilder, private snackBar: MatSnackBar){
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
    }else{
      console.log("No hay pago");
    }
  }
  submitForm(){

  }
}
