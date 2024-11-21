import { Component, computed, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriasService } from '../../services/categorias/categorias.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubcategoriasService } from '../../services/subcategorias/subcategorias.service';
import { CuentasService } from '../../services/cuentas/cuentas.service';
import { PagosService } from '../../services/pagos/pagos.service';
import {MatRadioModule} from '@angular/material/radio';
import { PagosProgService } from '../../services/pagosProg/pagos-prog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movimientos-form',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, ReactiveFormsModule, MatRadioModule],
  templateUrl: './movimientos-form.component.html',
  styleUrl: './movimientos-form.component.css'
})
export class MovimientosFormComponent implements OnInit{

  pagosForm: FormGroup = new FormGroup({});
  cuentas: any;
  categorias: any;
  selectedCategory = '';
  subcategorias: any;


  constructor(private router: Router, private pagoProSvc: PagosProgService,private pagoSvc: PagosService,  private catSrv: CategoriasService, private snackBar: MatSnackBar, private  subSrv: SubcategoriasService, private cuenSrv: CuentasService){}
  
  
  ngOnInit(): void {
    this.pagosForm = new FormGroup({
      no_cuenta: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      subcategoria: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      monto: new FormControl('', [Validators.required, Validators.min(0)]),
      tipoMovimiento: new FormControl('', Validators.required),
      diaPago: new FormControl({ value:'', disabled:true}),
      totalPagos: new FormControl({value:'', disabled: true})
    });

    this.loadActiveCategorias();
    this.loadActiveCuentas();

    this.pagosForm.get('tipoMovimiento')?.valueChanges.subscribe(value=>{
      if(value === 'unica'){
        this.pagosForm.get('diaPago')?.disable();
        this.pagosForm.get('totalPagos')?.disable();
      }
      else{
        this.pagosForm.get('diaPago')?.enable();
        this.pagosForm.get('totalPagos')?.enable();
      }
    });
  }

  loadActiveCuentas():void{
    this.cuenSrv.getCuentasActivas().subscribe(
      (data)=>{
        this.cuentas = data;
      },
      (error)=>{
        console.error('Error fetching cuentas: ', error);
      });
  }

  loadActiveCategorias():void{
    this.catSrv.getCategoriasActivas().subscribe(
      (data)=>{
        this.categorias = data;
      },
      (error)=>{
        console.error('Error fetching categorias: ', error);
      });
  }

  loadSubcategorias(event: any):void{
    this.selectedCategory = event.target.value;
    console.log(this.selectedCategory);
    this.subSrv.getSubcategoriasByCat(this.selectedCategory).subscribe(
      (data)=>{
        this.subcategorias=data;
      },
      (error)=>{
        console.error('Error fetching subcategorias: ', error);
      }
    )
  }

  cancel(){
    this.router.navigate(['/movimientos']);
  }
  submitForm(){
    if(this.pagosForm.valid){
      const formData = this.pagosForm.value;
      console.log("Monto:"+formData.monto);
      if(formData.tipoMovimiento ===  'unica'){
        this.pagoSvc.postPago(
          formData.no_cuenta,
          formData.descripcion,
          formData.monto,
          formData.categoria,
          formData.subcategoria
        ).subscribe(response =>{
              this.snackBar.open('Pago Registrado con exito', 'Cerrar',{
          duration: 5000
        })
        this.router.navigate(['/movimientos']);
        }, error =>{
            const errorMessage = error.error?.message || 'Error al registrar pago';
            this.snackBar.open('Error registrando pago'+errorMessage, 'Cerrar',{
            duration: 5000
          })
        });
      }else{
        console.log("error")
        this.pagoProSvc.postPagoProgramado(
          formData.no_cuenta,
          formData.descripcion,
          formData.monto,
          formData.categoria,
          formData.subcategoria,
          formData.diaPago,
          formData.totalPagos
        ).subscribe(response =>{
          this.snackBar.open('Pago Programdo con exito', 'Cerrar',{
            duration: 5000
          })}, error=>{
            const errorMessage = error.error?.message || 'Error al programar pago';
            this.snackBar.open('Error programando pago'+errorMessage, 'Cerrar',{
            duration: 5000
          })
      })}
  }else{
    alert("Formulario Invalido o fondos insuficientes");
  }}
}
